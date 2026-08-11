import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { modules } from '../../data/git-tutorial'
import type { TerminalBlock, TerminalLine } from '../../data/git-tutorial'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdTerminal,
  MdStorage,
  MdCallSplit,
  MdHistory,
  MdMergeType,
  MdRateReview,
  MdBuildCircle,
  MdMenuBook,
} from 'react-icons/md'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const MODULE_ICONS = {
  'module-1': <MdStorage size={15} />,
  'module-2': <MdCallSplit size={15} />,
  'module-3': <MdHistory size={15} />,
  'module-4': <MdMergeType size={15} />,
  'module-5': <MdRateReview size={15} />,
  'module-6': <MdBuildCircle size={15} />,
  'module-7': <MdMenuBook size={15} />,
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TerminalBlockComponent({ block }: { block: TerminalBlock }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = block.lines
      .filter(l => l.type === 'prompt')
      .map(l => l.text)
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div>
        <div>
          <span />
          <span />
          <span />
          <span>{block.label ?? 'bash'}</span>
        </div>
        <button onClick={handleCopy} aria-label="Copy to clipboard">
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>
      <div>
        {block.lines.map((line: TerminalLine, i) => (
          <span key={i}>
            {line.type === 'prompt' && (
              <span>
                {'gearheads@ftc:~/FtcRobotController$ '}
              </span>
            )}
            {line.type === 'blank' ? ' ' : line.text}
          </span>
        ))}
      </div>
    </div>
  )
}

function TipBox({ tip }: { tip: string }) {
  return (
    <div>
      <span>Tip</span>
      <p>{tip}</p>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GitTutorialPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const currentIdx = modules.findIndex(m => m.slug === slug)
  const module = modules[currentIdx]
  const prevModule = currentIdx > 0 ? modules[currentIdx - 1] : null
  const nextModule = currentIdx < modules.length - 1 ? modules[currentIdx + 1] : null

  if (!module) {
    navigate('/resources/git/repository-basics', { replace: true })
    return null
  }

  const progressPct = ((currentIdx + 1) / modules.length) * 100

  return (
    <div>
      <aside aria-label="Course modules">
        <div>
          <div>
            <div>
              <MdTerminal size={17} />
            </div>
            <div>
              <span>Git Workshop</span>
              <span>GitHub for FTC</span>
            </div>
          </div>
          <div>
            <div>
              <div style={{ width: `${progressPct}%` }} />
            </div>
            <span>{currentIdx + 1} / {modules.length}</span>
          </div>
        </div>

        <div>
          <p>Modules</p>
          {modules.map(m => (
            <button
              key={m.id}
              onClick={() => navigate(`/resources/git/${m.slug}`)}
            >
              <span>
                {MODULE_ICONS[m.id as keyof typeof MODULE_ICONS]}
              </span>
              {m.title}
            </button>
          ))}
        </div>
      </aside>

      <div>
        <div>
          <span>Module {module.number} / 7</span>
        </div>

        <div key={module.id}>
          <span>Module {module.number}</span>

          <h1>{module.title}</h1>

          <p>{module.description}</p>
          <hr />

          <div>
            {module.concepts.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>

          {module.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {module.terminals.map(tb => (
            <TerminalBlockComponent key={tb.id} block={tb} />
          ))}

          {module.tip && <TipBox tip={module.tip} />}

          <div>
            {prevModule ? (
              <div>
                <button onClick={() => navigate(`/resources/git/${prevModule.slug}`)}>
                  <span>
                    <MdKeyboardArrowLeft size={14} />
                    Previous
                  </span>
                  <span>{prevModule.title}</span>
                </button>
              </div>
            ) : (
              <div />
            )}
            {nextModule ? (
              <div>
                <button onClick={() => navigate(`/resources/git/${nextModule.slug}`)}>
                  <span>
                    Next
                    <MdKeyboardArrowRight size={14} />
                  </span>
                  <span>{nextModule.title}</span>
                </button>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
