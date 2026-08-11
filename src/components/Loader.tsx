interface Props {
  showText?: boolean
}

export default function Loader({ showText = false }: Props) {
  return <p>{showText ? 'Loading GEarheads…' : 'Loading…'}</p>
}
