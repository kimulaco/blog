import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCard from './index.vue'

describe('AppCard component', () => {
  test('should render children content', () => {
    const wrapper = mount(AppCard, {
      slots: {
        default: '<p data-testid="children">children content</p>',
      },
    })

    expect(wrapper.text()).toBe('children content')
    expect(wrapper.find('[data-testid="children"]')).exist.toBeTruthy()
  })

  test('should change root tag name', () => {
    const divWrapper = mount(AppCard, {
      slots: {
        default: '<p data-testid="children">children content</p>',
      },
    })
    expect(divWrapper.element.tagName).toBe('DIV')

    const sectionWrapper = mount(AppCard, {
      slots: {
        default: '<p data-testid="children">children content</p>',
      },
      props: {
        tag: 'section',
      },
    })
    expect(sectionWrapper.element.tagName).toBe('SECTION')
  })

  test('should linkable', () => {
    const wrapper = mount(AppCard, {
      slots: {
        default: '<p data-testid="children">children content</p>',
      },
      props: {
        to: '/test',
      },
    })
    const anchor = wrapper.find('a')
    expect(anchor.element.tagName).toBe('A')
    expect(anchor.element.getAttribute('href')).toBe('/test')
  })
})
