// Minimal regex-based Java tokenizer — avoids pulling in Prism/highlight.js
// for a handful of code blocks. Good enough for FTC-SDK-style snippets, not a
// general-purpose Java parser.

export type TokenKind = 'keyword' | 'string' | 'comment' | 'annotation' | 'plain'

export interface Token {
  kind: TokenKind
  text: string
}

const KEYWORDS = new Set([
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
  'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
  'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
  'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new',
  'package', 'private', 'protected', 'public', 'return', 'short', 'static',
  'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
  'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null',
])

// Order matters: comments/strings/annotations are matched greedily first so
// keyword matching never runs inside them.
const TOKEN_PATTERN =
  /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(@[A-Za-z_][\w]*)|([A-Za-z_][\w]*)|(\s+)|([^\sA-Za-z_]+)/g

export function tokenizeJava(source: string): Token[] {
  const tokens: Token[] = []
  let match: RegExpExecArray | null

  TOKEN_PATTERN.lastIndex = 0
  while ((match = TOKEN_PATTERN.exec(source)) !== null) {
    const [, lineComment, blockComment, string, annotation, word] = match

    if (lineComment !== undefined || blockComment !== undefined) {
      tokens.push({ kind: 'comment', text: lineComment ?? blockComment })
    } else if (string !== undefined) {
      tokens.push({ kind: 'string', text: string })
    } else if (annotation !== undefined) {
      tokens.push({ kind: 'annotation', text: annotation })
    } else if (word !== undefined) {
      tokens.push({ kind: KEYWORDS.has(word) ? 'keyword' : 'plain', text: word })
    } else {
      tokens.push({ kind: 'plain', text: match[0] })
    }
  }

  return tokens
}
