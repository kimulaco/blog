import { describe, test, expect } from 'vitest'
import { convertMdToHtml } from './index'

describe('convertMdToHtml()', () => {
  test('should convert markdown to html', () => {
    const html = convertMdToHtml(`
## はじめに

こんにちは。

## さいごに

いかがでしたでしょうか。
`)

    expect(html).toBe(`<div class="PostContent_index">
<h2 class="PostContent_index-title">目次</h2>
<ul><li><a href="#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB">はじめに</a></li><li><a href="#%E3%81%95%E3%81%84%E3%81%94%E3%81%AB">さいごに</a></li></ul>
</div>
<h2 id="%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB">はじめに</h2><p>こんにちは。</p>
<h2 id="%E3%81%95%E3%81%84%E3%81%94%E3%81%AB">さいごに</h2><p>いかがでしたでしょうか。</p>
`)
  })

  test('should add target attr to anchor element', () => {
    const html = convertMdToHtml(`
こんにちは。

[GitHub](https://github.com/kimulaco)と[X](https://twitter.com/kimulaco)をやっています。

私については[About](/about)をご覧ください。
`)

    expect(html).toBe(`<p>こんにちは。</p>
<p><a href="https://github.com/kimulaco" target="_blank" rel="noopener noreferrer">GitHub</a>と<a href="https://twitter.com/kimulaco" target="_blank" rel="noopener noreferrer">X</a>をやっています。</p>
<p>私については<a href="/about">About</a>をご覧ください。</p>
`)
  })

  test('should add loading attr to img element', () => {
    const html = convertMdToHtml(`
こんにちは。

![](/img/profile.jpg)

![プロフィール画像](/img/profile.jpg)
`)

    expect(html).toBe(`<p>こんにちは。</p>
<p><img src="/img/profile.jpg" alt="" loading="lazy" /></p>
<p><img src="/img/profile.jpg" alt="プロフィール画像" loading="lazy" /></p>
`)
  })

  test('should hightlight code element', () => {
    const html = convertMdToHtml(`
こんにちは。

\`\`\`js
document.querySelector('.layer-01').style.fill = '#f00'
\`\`\`
`)

    expect(html).toBe(`<p>こんにちは。</p>
<pre class="language-js"><code>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.layer-01'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>fill <span class="token operator">=</span> <span class="token string">'#f00'</span></code></pre>`)
  })

  test('should hightlight plane text code element', () => {
    const html = convertMdToHtml(`
こんにちは。

\`\`\`
document.querySelector('.layer-01').style.fill = '#f00'
\`\`\`
`)

    expect(html).toBe(`<p>こんにちは。</p>
<pre class="language-plain-text"><code>document.querySelector('.layer-01').style.fill = '#f00'</code></pre>`)
  })
})
