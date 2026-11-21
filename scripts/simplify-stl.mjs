#!/usr/bin/env node
// One-time (or run-whenever-you-add-a-big-STL) decimation tool for
// src/assets/parts/*.stl. These files only drive the in-browser 3D preview
// on the Parts page (the "Download" button points at a Google Drive link,
// never at these bundled files) — so there is no reason to ship
// manufacturing-resolution meshes to the browser. This rewrites each STL
// in place, capping it at TARGET_TRIANGLES using three.js's meshoptimizer-
// based SimplifyModifier, and leaves already-small files untouched.
//
// Run: node scripts/simplify-stl.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const TARGET_TRIANGLES = 60000

const __dirname = dirname(fileURLToPath(import.meta.url))
const PARTS_DIR = join(__dirname, '..', 'src', 'assets', 'parts')

function toArrayBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
}

async function simplifyFile(filePath) {
  const raw = readFileSync(filePath)
  const originalBytes = raw.byteLength

  let geometry = new STLLoader().parse(toArrayBuffer(raw))
  const rawTriangles = Math.floor(geometry.getAttribute('position').count / 3)

  // Binary STL is non-indexed with one normal per FACE, so adjacent triangles
  // never share a vertex (their normals differ) — welding on position+normal
  // finds nothing to merge, and the simplifier sees a fully disconnected mesh
  // with no edges it can collapse. Drop the normal first so welding works on
  // position alone, then recompute smooth normals after simplifying (a
  // preview mesh doesn't need the original's flat-shaded facets).
  geometry.deleteAttribute('normal')
  geometry.deleteAttribute('uv')
  geometry = mergeVertices(geometry)

  const weldedVerts = geometry.getAttribute('position').count
  const weldedTriangles = geometry.getIndex().count / 3

  if (weldedTriangles <= TARGET_TRIANGLES) {
    console.log(`  skip — already ${Math.round(weldedTriangles).toLocaleString()} triangles after welding`)
    return
  }

  const keepRatio = TARGET_TRIANGLES / weldedTriangles
  const removeCount = Math.floor(weldedVerts * (1 - keepRatio))

  const start = Date.now()
  const simplified = await new SimplifyModifier().modify(geometry, removeCount)
  simplified.computeVertexNormals()
  const seconds = ((Date.now() - start) / 1000).toFixed(1)

  const newTriangles = simplified.getIndex()
    ? simplified.getIndex().count / 3
    : simplified.getAttribute('position').count / 3

  const mesh = new THREE.Mesh(simplified)
  const outBuffer = new STLExporter().parse(mesh, { binary: true })
  writeFileSync(filePath, Buffer.from(outBuffer))

  const originalMB = (originalBytes / 1e6).toFixed(1)
  const newMB = (outBuffer.byteLength / 1e6).toFixed(2)
  console.log(
    `  ${rawTriangles.toLocaleString()} raw -> ${weldedTriangles.toLocaleString()} welded -> ` +
    `${Math.round(newTriangles).toLocaleString()} simplified triangles, ` +
    `${originalMB}MB -> ${newMB}MB (${seconds}s)`
  )
}

const files = readdirSync(PARTS_DIR).filter((f) => f.toLowerCase().endsWith('.stl'))
if (files.length === 0) {
  console.log('No .stl files found in src/assets/parts/')
  process.exit(0)
}

for (const file of files) {
  console.log(file)
  await simplifyFile(join(PARTS_DIR, file))
}
