import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MdViewInAr, MdErrorOutline } from 'react-icons/md'
import { theme } from '../../styles/theme'
import type { StlWorkerRequest, StlWorkerResponse } from './stlWorker'

let nextRequestId = 0

type ViewerStatus = 'idle' | 'loading' | 'loaded' | 'error' | 'empty'

interface Props {
  stlUrl: string | null
  label: string
  /** Enables drag-to-orbit. Card tiles leave this off so hover/click stay simple. */
  interactive?: boolean
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Canvas = styled.canvas<{ $ready: boolean }>`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  opacity: ${({ $ready }) => ($ready ? 1 : 0)};
  transition: opacity 0.3s ease;
  touch-action: none;
`

const StatusOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${theme.colors.textSecondary};
  background: ${theme.colors.surfaceRaised};
`

const StatusLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.75;
`

// ─── Loading progress ring ──────────────────────────────────────────────────

const RING_SIZE = 44
const RING_STROKE = 3
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const RingSvg = styled.svg<{ $spinning: boolean }>`
  display: block;
  transform-origin: 50% 50%;
  ${({ $spinning }) =>
    $spinning &&
    css`
      animation: ${spin} 0.9s linear infinite;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`

const RingTrack = styled.circle`
  fill: none;
  stroke: ${theme.colors.hairlineStrong};
  stroke-width: ${RING_STROKE};
`

const RingArc = styled.circle`
  fill: none;
  stroke: ${theme.colors.primary};
  stroke-width: ${RING_STROKE};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.15s linear;
`

const RingWrap = styled.div`
  position: relative;
  width: ${RING_SIZE}px;
  height: ${RING_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RingPercent = styled.span`
  position: absolute;
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
`

function ProgressRing({ progress }: { progress: number | null }) {
  const indeterminate = progress === null
  const offset = indeterminate
    ? RING_CIRCUMFERENCE * 0.75
    : RING_CIRCUMFERENCE * (1 - progress)

  return (
    <RingWrap>
      <RingSvg
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        $spinning={indeterminate}
      >
        <RingTrack cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} />
        <RingArc
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      </RingSvg>
      {!indeterminate && <RingPercent>{Math.round(progress * 100)}</RingPercent>}
    </RingWrap>
  )
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function PartViewer3D({ stlUrl, label, interactive = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<ViewerStatus>(stlUrl ? 'idle' : 'empty')
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)

  useEffect(() => {
    setStatus(stlUrl ? 'idle' : 'empty')
    setProgress(null)
  }, [stlUrl])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !stlUrl) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [stlUrl])

  useEffect(() => {
    if (!stlUrl || !isVisible) return
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    let disposed = false
    let controls: OrbitControls | null = null
    const reduceMotion = prefersReducedMotion()

    setStatus('loading')

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    // Three-quarter view: face-on (0,0,5) renders most CAD parts as a flat silhouette.
    camera.position.set(-3.6, 2.4, 3.4)
    camera.lookAt(0, 0, 0)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      // Browser is out of live WebGL contexts (common when many tiles churn
      // in/out quickly) or WebGL is unavailable — fail into the error state
      // instead of crashing the page.
      setStatus('error')
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    scene.add(new THREE.AmbientLight(0xffffff, 0.65))
    const key = new THREE.DirectionalLight(0xffffff, 1.1)
    key.position.set(3, 4, 5)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 0.4)
    fill.position.set(-4, -2, -3)
    scene.add(fill)

    let mesh: THREE.Mesh | null = null

    function renderOnce() {
      if (disposed) return
      renderer.render(scene, camera)
    }

    function resize() {
      if (!wrap) return
      const { clientWidth, clientHeight } = wrap
      if (clientWidth === 0 || clientHeight === 0) return
      camera.aspect = clientWidth / clientHeight
      // Parts are normalised to ~2.4 units; back the camera off until that fits
      // the narrower of the vertical/horizontal FOV so tall panes don't clip.
      const vHalf = THREE.MathUtils.degToRad(camera.fov / 2)
      const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect)
      camera.position.setLength(1.55 / Math.sin(Math.min(vHalf, hHalf)))
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
      renderOnce()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)
    resize()

    // No auto-rotate, no continuous render loop: the viewer stays a single
    // static frame until the visitor actually interacts (hover on a tile,
    // drag in the modal) — cheap with several heavy meshes on screen at once.
    if (interactive) {
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = false
      controls.autoRotate = false
      controls.enablePan = false
      controls.minDistance = 2.2
      controls.maxDistance = 14
      controls.addEventListener('change', renderOnce)
    }

    // Parsing + normal computation + centering/scaling happen in a worker —
    // for the multi-hundred-megabyte assembly STLs on this page, doing that
    // work on the main thread froze the whole tab while a tile loaded.
    const requestId = nextRequestId++
    const worker = new Worker(new URL('./stlWorker.ts', import.meta.url), { type: 'module' })
    worker.onmessage = (event: MessageEvent<StlWorkerResponse>) => {
      if (disposed || event.data.id !== requestId) return
      if (event.data.type === 'progress') {
        setProgress(event.data.progress)
        return
      }
      if (!event.data.ok) {
        setStatus('error')
        return
      }
      const { position, normal } = event.data
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
      geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3))

      const material = new THREE.MeshStandardMaterial({
        color: theme.colors.primary,
        metalness: 0.15,
        roughness: 0.55,
      })
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      setStatus('loaded')
      renderOnce()
    }
    worker.onerror = () => {
      if (!disposed) setStatus('error')
    }
    const request: StlWorkerRequest = { id: requestId, url: stlUrl }
    worker.postMessage(request)

    // Tiles only spin while the pointer is actually over them — a short
    // rAF loop that starts on hover and stops the moment it isn't needed,
    // never a background animation running for every card at once.
    let hoverFrameId = 0
    function hoverTick() {
      if (mesh) {
        mesh.rotation.y += 0.02
        renderOnce()
      }
      hoverFrameId = requestAnimationFrame(hoverTick)
    }
    function onEnter() {
      if (reduceMotion) return
      cancelAnimationFrame(hoverFrameId)
      hoverFrameId = requestAnimationFrame(hoverTick)
    }
    function onLeave() {
      cancelAnimationFrame(hoverFrameId)
    }
    if (!interactive) {
      wrap.addEventListener('pointerenter', onEnter)
      wrap.addEventListener('pointerleave', onLeave)
    }

    return () => {
      disposed = true
      worker.terminate()
      cancelAnimationFrame(hoverFrameId)
      resizeObserver.disconnect()
      controls?.removeEventListener('change', renderOnce)
      controls?.dispose()
      if (!interactive) {
        wrap.removeEventListener('pointerenter', onEnter)
        wrap.removeEventListener('pointerleave', onLeave)
      }
      mesh?.geometry.dispose()
      if (mesh) {
        const mat = mesh.material
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else mat.dispose()
      }
      renderer.dispose()
      // dispose() frees GPU resources but leaves the WebGL context allocated
      // until GC; force it so scrolling many tiles in/out doesn't hit the
      // browser's live-context cap.
      renderer.forceContextLoss()
    }
  }, [stlUrl, isVisible, interactive])

  return (
    <Wrap ref={wrapRef} role="img" aria-label={`3D preview of ${label}`}>
      {stlUrl && (
        <Canvas ref={canvasRef} $ready={status === 'loaded'} aria-hidden="true" />
      )}
      {status === 'empty' && (
        <StatusOverlay>
          <MdViewInAr size={26} color={theme.colors.textSecondary} style={{ opacity: 0.5 }} />
          <StatusLabel>No 3D preview yet</StatusLabel>
        </StatusOverlay>
      )}
      {status === 'loading' && (
        <StatusOverlay>
          <ProgressRing progress={progress} />
          <StatusLabel>Loading model</StatusLabel>
        </StatusOverlay>
      )}
      {status === 'error' && (
        <StatusOverlay>
          <MdErrorOutline size={24} color={theme.colors.error} />
          <StatusLabel>Preview failed to load</StatusLabel>
        </StatusOverlay>
      )}
    </Wrap>
  )
}
