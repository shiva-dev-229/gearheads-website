import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MdArrowForward,
  MdArrowBack,
  MdPlace,
  MdRoute,
  MdImage,
  MdGroups,
} from 'react-icons/md'
import autoPathsData from '../../data/auto-paths.json'

// ─── Path diagram images (drop files into assets/photos/auto-paths/) ───────────

const PATH_IMAGES = import.meta.glob(
  '../../assets/photos/auto-paths/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' }
) as Record<string, string>

function resolveImage(filename: string): string | null {
  if (!filename) return null
  const match = Object.entries(PATH_IMAGES).find(([key]) => key.endsWith(`/${filename}`))
  return match ? match[1] : null
}

// ─── Component ────────────────────────────────────────────────────────────────

interface AutoPath {
  id: string
  name: string
  startingLocation: string
  description: string
  tags: string[]
  image: string
}

export default function AutoPathsPage() {
  const paths = autoPathsData.paths as AutoPath[]
  const [activeId, setActiveId] = useState(paths[0]?.id ?? '')

  const active = paths.find((p) => p.id === activeId) ?? paths[0]
  const activeImage = active ? resolveImage(active.image) : null

  return (
    <div>
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <span />
            Auto Paths
          </div>
          <h1>Every auto, open to our partners.</h1>
          <p>
            A shared reference for the autonomous routines we can run. Each entry lists where the
            robot starts, what it does, and a diagram of its route — so alliance partners can pick
            complementary starting spots and know exactly what to expect in the first 30 seconds.
          </p>
        </div>
      </section>

      <section>
        <div>
          <div>
            <div aria-hidden="true">
              <MdGroups size={20} />
            </div>
            <p>{autoPathsData.intro}</p>
          </div>
        </div>
      </section>

      <hr />

      {/* ── 2. Path Browser ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>Routine Library</p>
          <h2>Available Paths</h2>
          <p>
            Select a path to see its starting position, description, and route diagram.
          </p>

          {paths.length === 0 ? (
            <div>
              <MdRoute size={40} />
              <span>No paths added yet</span>
              <span>
                Auto paths will appear here as they're added — each with a starting location,
                description, and route diagram.
              </span>
            </div>
          ) : (
            <div>
              <div role="tablist" aria-label="Auto paths">
                {paths.map((p) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={p.id === activeId}
                    onClick={() => setActiveId(p.id)}
                  >
                    <span>{p.name}</span>
                    <span>
                      <MdPlace size={12} />
                      {p.startingLocation}
                    </span>
                  </button>
                ))}
              </div>

              {active && (
                <div key={active.id}>
                  <div>
                    {activeImage ? (
                      <img src={activeImage} alt={`${active.name} route diagram`} />
                    ) : (
                      <div>
                        <MdImage size={40} />
                        <span>path diagram</span>
                        <span>
                          Drop a diagram into assets/photos/auto-paths/ and set its filename in
                          auto-paths.json.
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3>{active.name}</h3>
                    <div>
                      <MdPlace size={14} />
                      <span>Starts</span>
                      <span>{active.startingLocation}</span>
                    </div>
                    <p>{active.description}</p>
                    {active.tags?.length > 0 && (
                      <div>
                        {active.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <hr />

      {/* ── 3. Continue Nav ──────────────────────────────────────────── */}
      <section>
        <div>
          <Link to="/programming" aria-label="Back to Software overview">
            <div>
              <div>
                <MdArrowBack size={20} />
              </div>
              <div>
                <span>Back to</span>
                <span>Software Overview</span>
              </div>
            </div>
            <div>
              <MdArrowForward size={20} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
