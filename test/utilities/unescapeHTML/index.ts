import { JSDOM } from 'jsdom'

export const unescapeHTML = (html: string): string => {
  const dom = new JSDOM(html)
  return dom.window.document.body.innerHTML
}
