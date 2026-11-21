import { readFileSync } from 'node:fs'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const filePath = process.argv[2]
const TARGET_TRIANGLES = 60000

const raw = readFileSync(filePath)
const ab = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength)
let geometry = new STLLoader().parse(ab)
geometry.deleteAttribute('normal')
geometry.deleteAttribute('uv')

const rawTriangles = Math.floor(geometry.getAttribute('position').count / 3)
geometry = mergeVertices(geometry)
const weldedVerts = geometry.getAttribute('position').count
const weldedTriangles = geometry.getIndex().count / 3
console.log('raw triangles:', rawTriangles, '-> welded unique verts:', weldedVerts, ', welded triangles:', weldedTriangles)

if (weldedTriangles <= TARGET_TRIANGLES) {
  console.log('already under target, would skip')
  process.exit(0)
}

const keepRatio = TARGET_TRIANGLES / weldedTriangles
const removeCount = Math.floor(weldedVerts * (1 - keepRatio))
console.log('removing', removeCount, 'of', weldedVerts, 'welded vertices...')
const t1 = Date.now()
const simplified = await new SimplifyModifier().modify(geometry, removeCount)
console.log('simplified in', Date.now() - t1, 'ms')
const newTriangles = simplified.getIndex() ? simplified.getIndex().count/3 : simplified.getAttribute('position').count/3
console.log('new triangles:', newTriangles)
