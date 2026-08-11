import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOpenInNew, MdArrowForward } from 'react-icons/md'

export interface FolderModalItemDetail {
  fullDesc: string
  projects: Array<{ name: string; desc: string }>
  url?: string
  linkLabel?: string
}

export interface FolderModalItem {
  icon: React.ReactNode
  title: string
  description: string
  url?: string
  detail?: FolderModalItemDetail
}

interface Props {
  title: string
  items: FolderModalItem[]
  onClose: () => void
}

export default function FolderModal({ title, items, onClose }: Props) {
  const [detailIdx, setDetailIdx] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (detailIdx !== null) setDetailIdx(null)
        else onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, detailIdx])

  const activeItem = detailIdx !== null ? items[detailIdx] : null

  return (
    <div role="dialog" aria-modal="true" aria-label={title}>
      {detailIdx !== null ? (
        <div>
          <button type="button" onClick={() => setDetailIdx(null)}>Back</button>
          <h2>{activeItem?.title}</h2>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <p>{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
      )}

      <button type="button" onClick={onClose}>Close</button>

      {detailIdx === null && (
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item.detail ? (
                <button type="button" onClick={() => setDetailIdx(i)}>
                  {item.icon}
                  <span>{item.title}</span>
                  <span>{item.description}</span>
                </button>
              ) : (
                <div>
                  {item.icon}
                  <span>{item.title}</span>
                  <span>{item.description}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <MdOpenInNew size={10} />
                      Visit {item.title}
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {activeItem?.detail && (
        <div>
          <div>
            {activeItem.icon}
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
          </div>

          <p>{activeItem.detail.fullDesc}</p>

          <p>Projects</p>
          <ul>
            {activeItem.detail.projects.map((p, i) => (
              <li key={i}>
                <span>{p.name}</span>
                <span>{p.desc}</span>
              </li>
            ))}
          </ul>

          {activeItem.detail.url && (
            <Link to={activeItem.detail.url} onClick={onClose}>
              {activeItem.detail.linkLabel ?? 'View section'}
              <MdArrowForward size={13} />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
