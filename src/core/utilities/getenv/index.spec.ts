import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { getenv } from './index'

describe('getenv', () => {
  const originalProcessEnv = process.env

  beforeEach(() => {
    process.env = { ...originalProcessEnv }
  })

  afterEach(() => {
    process.env = originalProcessEnv
  })

  it('should return value from process.env when available', () => {
    process.env.TEST_KEY = 'process-env-value'

    const result = getenv('TEST_KEY')
    expect(result).toBe('process-env-value')
  })

  it('should handle undefined environment variable', () => {
    delete process.env.UNDEFINED_KEY

    const result = getenv('UNDEFINED_KEY')
    expect(result).toBe('')
  })

  it('should handle empty string environment variable', () => {
    process.env.EMPTY_KEY = ''

    const result = getenv('EMPTY_KEY')
    expect(result).toBe('')
  })
})
