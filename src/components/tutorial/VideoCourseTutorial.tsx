import type { ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { CourseModule, Resource } from '../../data/tutorial-types'
import { MdPlayCircleOutline, MdOpenInNew } from 'react-icons/md'

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoBlock({ module }: { module: CourseModule }) {
  if (module.youtubeId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${module.youtubeId}`}
        title={`${module.title} — video lesson`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return (
    <div>
      <MdPlayCircleOutline size={26} />
      <p>Video in production — check back soon</p>
    </div>
  )
}

function ResourcesBlock({ resources }: { resources?: Resource[] }) {
  if (!resources || resources.length === 0) {
    return <p>Lesson-specific resources will be added here once available.</p>
  }
  return (
    <ul>
      {resources.map(r => (
        <li key={r.url}>
          {r.url.startsWith('/') ? (
            <Link to={r.url}>
              {r.label} <MdOpenInNew size={15} />
            </Link>
          ) : (
            <a href={r.url} target="_blank" rel="noreferrer">
              {r.label} <MdOpenInNew size={15} />
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

function TipBox({ tip }: { tip: string }) {
  return (
    <div>
      <strong>Important</strong>
      <p>{tip}</p>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export interface VideoCourseTutorialProps {
  basePath: string
  brandIcon: ReactNode
  brandTitle: string
  brandSub: string
  navLabel: string
  modules: CourseModule[]
  courseResources?: Resource[]
  defaultSlug: string
}

export default function VideoCourseTutorial({
  basePath,
  brandIcon,
  brandTitle,
  brandSub,
  navLabel,
  modules,
  courseResources,
  defaultSlug,
}: VideoCourseTutorialProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const currentIdx = modules.findIndex(m => m.slug === slug)
  const courseModule = modules[currentIdx]
  const prevModule = currentIdx > 0 ? modules[currentIdx - 1] : null
  const nextModule = currentIdx < modules.length - 1 ? modules[currentIdx + 1] : null

  if (!courseModule) {
    navigate(`${basePath}/${defaultSlug}`, { replace: true })
    return null
  }

  const groups: { label: string; items: CourseModule[] }[] = []
  for (const m of modules) {
    const label = m.section ?? navLabel
    const group = groups.find(g => g.label === label)
    if (group) group.items.push(m)
    else groups.push({ label, items: [m] })
  }

  const resources = [...(courseModule.resources ?? []), ...(courseResources ?? [])]
  const hasSupportingText = courseModule.body.length > 0 || !!courseModule.tip

  return (
    <div>
      <aside aria-label="Course lessons">
        <div>
          <div>
            {brandIcon}
            <div>
              <span>{brandTitle}</span>
              <span>{brandSub}</span>
            </div>
          </div>
          <p>
            {currentIdx + 1} / {modules.length}
          </p>
        </div>

        <nav>
          {groups.map(group => (
            <div key={group.label}>
              <p>{group.label}</p>
              <ul>
                {group.items.map(m => (
                  <li key={m.id}>
                    <Link
                      to={`${basePath}/${m.slug}`}
                      aria-current={m.slug === slug ? 'page' : undefined}
                    >
                      <span>{m.number}</span> {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div>
        <p>
          Lesson {courseModule.number} / {modules.length}
        </p>

        <div>
          <span>Lesson {courseModule.number}</span>
          {courseModule.meta && <span>{courseModule.meta}</span>}

          <h1>{courseModule.title}</h1>

          <p>{courseModule.description}</p>
          <hr />

          <ul>
            {courseModule.concepts.map(c => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          {hasSupportingText ? (
            <div>
              <div>
                {courseModule.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                {courseModule.tip && <TipBox tip={courseModule.tip} />}
              </div>

              <div>
                <VideoBlock module={courseModule} />

                <h2>Resources</h2>
                <ResourcesBlock resources={resources} />
              </div>
            </div>
          ) : (
            <div>
              <VideoBlock module={courseModule} />

              <h2>Resources</h2>
              <ResourcesBlock resources={resources} />
            </div>
          )}

          <div>
            {prevModule ? (
              <Link to={`${basePath}/${prevModule.slug}`}>
                <span>Previous</span>
                <span>{prevModule.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextModule ? (
              <Link to={`${basePath}/${nextModule.slug}`}>
                <span>Next</span>
                <span>{nextModule.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
