import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import styled from 'styled-components'

interface HoverTitleProps {
  text: string
  className?: string
  delay?: number
}

const Wrapper = styled.p`
  cursor: default;
`

const Word = styled.span`
  display: inline-block;
`

const Char = styled(motion.span)`
  display: inline-block;
`

const CharInner = styled.span<{ $offset: number; $reduced: boolean }>`
  display: inline-block;
  transform: ${({ $offset, $reduced }) =>
    $reduced ? 'none' : `translateY(${$offset}px)`};
  transition: ${({ $reduced }) =>
    $reduced ? 'none' : `transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)`};
`

export default function HoverTitle({ text, className, delay = 30 }: HoverTitleProps) {
  const shouldReduce = useReducedMotion() ?? false
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const words = text.split(' ')

  function getOffset(globalIndex: number): number {
    if (shouldReduce || hoveredIndex === null) return 0
    const dist = Math.abs(globalIndex - hoveredIndex)
    if (dist === 0) return -10
    if (dist === 1) return -5
    return 0
  }

  let cursor = 0

  return (
    <Wrapper className={className}>
      {words.map((word, wi) => {
        const wordChars = word.split('')
        const wordStart = cursor
        cursor += wordChars.length + (wi < words.length - 1 ? 1 : 0)

        return (
          <span key={wi}>
            <Word>
              {wordChars.map((char, ci) => {
                const gi = wordStart + ci
                return (
                  <Char
                    key={gi}
                    initial={
                      shouldReduce
                        ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                        : { opacity: 0, filter: 'blur(8px)', y: 14 }
                    }
                    animate={
                      mounted
                        ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                        : undefined
                    }
                    transition={
                      shouldReduce
                        ? { duration: 0 }
                        : {
                            duration: 0.5,
                            delay: (gi * delay) / 1000,
                            ease: 'easeOut',
                          }
                    }
                    onMouseEnter={() => setHoveredIndex(gi)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <CharInner $offset={getOffset(gi)} $reduced={shouldReduce}>
                      {char}
                    </CharInner>
                  </Char>
                )
              })}
            </Word>
            {wi < words.length - 1 && ' '}
          </span>
        )
      })}
    </Wrapper>
  )
}
