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

  renderer.heading = (text, level) => {
    const escapedText = encodeURIComponent(text.toLowerCase())

    if (level === 2) {
      headings.push({ text, id: escapedText })
    }

    return `<h${level} id="${escapedText}">${text}</h${level}>`
  }

  renderer.image = (href, _, text) => {
    return `<img src="${href}" alt="${text || ''}" loading="lazy" />`
  }

  renderer.link = (href, _, text) => {
    if (!/https?:\/\//.test(href)) {
      return `<a href="${href}">${text}</a>`
    }

    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  }

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

  let html = marked(md, { renderer })

  if (headings.length > 0) {
    html = createToc(headings) + '\n' + html
  }

  return html
}
