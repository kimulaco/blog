import { JSDOM } from 'jsdom'

export const parseHTML = (html: string): Document => {
  const dom = new JSDOM(html)
  return dom.window.document
}
