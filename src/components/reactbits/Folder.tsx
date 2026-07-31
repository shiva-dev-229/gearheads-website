import './Folder.css'

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex
  if (color.length === 3) color = color.split('').map(c => c + c).join('')
  const num = parseInt(color, 16)
  const r = Math.max(0, Math.min(255, Math.floor(((num >> 16) & 0xff) * (1 - percent))))
  const g = Math.max(0, Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 - percent))))
  const b = Math.max(0, Math.min(255, Math.floor((num & 0xff) * (1 - percent))))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

interface FolderProps {
  color?: string
  items?: React.ReactNode[]
  className?: string
  onClick?: () => void
  scale?: number
}

export default function Folder({ color = '#5227FF', items = [], className = '', onClick, scale }: FolderProps) {
  const papers = [...items.slice(0, 3)]
  while (papers.length < 3) papers.push(null)

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': darkenColor(color, 0.08),
    '--paper-1': darkenColor('#ffffff', 0.1),
    '--paper-2': darkenColor('#ffffff', 0.05),
    '--paper-3': '#ffffff',
  } as React.CSSProperties

  return (
    <div className={`folder-wrapper${className ? ` ${className}` : ''}`} style={scale ? { zoom: scale } : undefined}>
      <div
        className="folder"
        style={folderStyle}
        onClick={onClick}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } }}
        tabIndex={0}
        role="button"
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div key={i} className={`paper paper-${i + 1}`}>{item}</div>
          ))}
          <div className="folder__front" />
          <div className="folder__front right" />
        </div>
      </div>
    </div>
  )
}
