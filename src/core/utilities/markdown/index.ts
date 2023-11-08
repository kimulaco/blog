import { marked } from 'marked'
import prism from 'prismjs'

import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'

const renderer = new marked.Renderer()

renderer.code = (code, language) => {
  if (!language) {
    return `<pre class="language-plain-text"><code>${code}</code></pre>`
  }

  const highlightedCode = prism.highlight(
    code,
    prism.languages[language],
    language
  )

  return `<pre class="language-${language}"><code>${highlightedCode}</code></pre>`
}

export const convertMdToHtml = (md: string): string => {
  return marked(md, { renderer })
}
