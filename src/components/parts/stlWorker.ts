// Parses STL files off the main thread. Some of this site's STL exports are
// tens to hundreds of megabytes (full-assembly exports, not simplified single
// parts) — parsing, normal computation, and centering/scaling those on the
// main thread was freezing the page while a tile loaded. This worker does all
// of that and hands back ready-to-use position/normal buffers.

import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

// tsconfig has no "webworker" lib (it would conflict with the app's "DOM"
// lib), so `self` here is typed as `Window` by default. Narrow it to just the
// worker-global surface this file actually uses instead of pulling in the
// full webworker lib.
const ctx = self as unknown as {
  onmessage: ((event: MessageEvent<StlWorkerRequest>) => void) | null
  postMessage(message: StlWorkerResponse, transfer?: Transferable[]): void
}

export interface StlWorkerRequest {
  id: number
  url: string
}

export type StlWorkerResponse =
  | { id: number; type: 'progress'; progress: number }
  | { id: number; type: 'done'; ok: true; position: Float32Array; normal: Float32Array }
  | { id: number; type: 'done'; ok: false }

async function fetchWithProgress(url: string, onProgress: (fraction: number) => void) {
  const response = await fetch(url)
  if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`)

  const total = Number(response.headers.get('content-length')) || 0
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0
  let lastReportedPct = -1

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    received += value.length
    if (total > 0) {
      const pct = Math.floor((received / total) * 100)
      if (pct !== lastReportedPct) {
        lastReportedPct = pct
        onProgress(received / total)
      }
    }
  }

  const buffer = new Uint8Array(received)
  let offset = 0
  for (const chunk of chunks) {
    buffer.set(chunk, offset)
    offset += chunk.length
  }
  return buffer.buffer
}

ctx.onmessage = async (event) => {
  const { id, url } = event.data
  try {
    const buffer = await fetchWithProgress(url, (progress) => {
      ctx.postMessage({ id, type: 'progress', progress })
    })

    const geometry = new STLLoader().parse(buffer)

    // Binary STL carries one normal per facet, which STLLoader already
    // writes into the normal attribute — computeVertexNormals() redoes that
    // work (expensive at millions of vertices) and is only needed when a
    // file's normals are missing/zeroed, so check a sample before paying for it.
    const normalAttr = geometry.getAttribute('normal') as THREE.BufferAttribute | undefined
    let hasRealNormals = false
    if (normalAttr) {
      for (let i = 0; i < Math.min(normalAttr.count, 300); i++) {
        if (normalAttr.getX(i) !== 0 || normalAttr.getY(i) !== 0 || normalAttr.getZ(i) !== 0) {
          hasRealNormals = true
          break
        }
      }
    }
    if (!hasRealNormals) geometry.computeVertexNormals()

    geometry.computeBoundingBox()
    const box = geometry.boundingBox as THREE.Box3
    const center = new THREE.Vector3()
    box.getCenter(center)
    geometry.translate(-center.x, -center.y, -center.z)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    geometry.scale(2.4 / maxDim, 2.4 / maxDim, 2.4 / maxDim)

    const position = (geometry.getAttribute('position') as THREE.BufferAttribute)
      .array as Float32Array
    const normal = (geometry.getAttribute('normal') as THREE.BufferAttribute)
      .array as Float32Array

    ctx.postMessage(
      { id, type: 'done', ok: true, position, normal },
      [position.buffer, normal.buffer]
    )
  } catch {
    ctx.postMessage({ id, type: 'done', ok: false })
  }
}
