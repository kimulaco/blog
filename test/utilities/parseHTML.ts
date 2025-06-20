import { Window } from 'happy-dom'

export const parseHTML = (html: string) => {
  const window = new Window()
  window.document.documentElement.innerHTML = html
  return window.document
}
