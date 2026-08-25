import styled, { keyframes } from 'styled-components'
import { MdPrecisionManufacturing } from 'react-icons/md'
import { theme } from '../styles/theme'
import BlurText from './reactbits/BlurText'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const spinReverse = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
`

const Ring = styled.div<{ $size: number; $reverse?: boolean; $color: string; $opacity: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: ${({ $color }) => $color};
  border-right-color: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => $opacity};
  animation: ${({ $reverse }) => ($reverse ? spinReverse : spin)} 1.4s linear infinite;
`

const Stage = styled.div<{ $size: number }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CenterIcon = styled.div`
  position: absolute;
  color: ${theme.colors.primary};
  font-size: 22px;
  animation: ${pulse} 2s ease-in-out infinite;
  z-index: 1;
`

const TextWrap = styled.div`
  font-family: ${theme.fonts.headline};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
`

interface Props {
  size?: number
  showText?: boolean
}

export default function Loader({ size = 80, showText = false }: Props) {
  const innerSize = Math.round(size * 0.55)
  const outerSize = Math.round(size * 1.22)

  return (
    <Wrapper>
      <Stage $size={outerSize}>
        <Ring $size={size} $color={theme.colors.primary} $opacity={1} />
        <Ring $size={innerSize} $color={theme.colors.secondary} $opacity={0.55} $reverse />
        <CenterIcon>
          <MdPrecisionManufacturing />
        </CenterIcon>
      </Stage>

      {showText && (
        <TextWrap>
          <BlurText
            text="GEARHEADS"
            animateBy="characters"
            delay={60}
            stepDuration={0.25}
            direction="bottom"
          />
        </TextWrap>
      )}
    </Wrapper>
  )
}
