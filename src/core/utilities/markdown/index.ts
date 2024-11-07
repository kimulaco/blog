import { marked } from 'marked'
import prism from 'prismjs'

import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-toml'
import 'prismjs/components/prism-bash'

type Heading = { text: string; id: string }

const createToc = (headings: Heading[]): string => {
  const toc = headings
    .map((heading) => {
      return `<li><a href="#${heading.id}">${heading.text}</a></li>`
    })
    .join('')

  return `<div class="PostContent_index">
<h2 class="PostContent_index-title">目次</h2>
<ul>${toc}</ul>
</div>`
}

export const convertMdToHtml = (md: string): string => {
  const renderer = new marked.Renderer()
  const headings: Heading[] = []

  renderer.heading = ({ text, depth }) => {
    const escapedText = encodeURIComponent(text.toLowerCase())

    if (depth === 2) {
      headings.push({ text, id: escapedText })
    }

    return `<h${depth} id="${escapedText}">${text}</h${depth}>`
  }

  renderer.image = ({ href, text }) => {
    return `<img src="${href}" alt="${text || ''}" loading="lazy" />`
  }

  renderer.link = ({ href, text }) => {
    if (!/https?:\/\//.test(href)) {
      return `<a href="${href}">${text}</a>`
    }

    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  }

  renderer.code = ({ text, lang }) => {
    if (!lang) {
      return `<pre class="language-plain-text"><code>${text}</code></pre>`
    }

    const highlightedCode = prism.highlight(text, prism.languages[lang], lang)

    return `<pre class="language-${lang}"><code>${highlightedCode}</code></pre>`
  }

  let html = marked(md, { renderer })

  if (headings.length > 0) {
    html = createToc(headings) + '\n' + html
  }

  if (typeof html !== 'string') {
    throw new Error('failed convert markdown to HTML.')
  }

  return html
}
