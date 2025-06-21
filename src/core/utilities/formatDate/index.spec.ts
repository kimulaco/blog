import { describe, expect, it } from 'vitest'
import { formatDate } from './index'

describe('formatDate', () => {
  it('should format valid ISO date string', () => {
    const result = formatDate('2023-12-25T10:30:00.000Z')
    expect(result).toBe('2023-12-25')
  })

  it('should format valid date string with timezone', () => {
    const result = formatDate('2023-12-25T23:30:00+09:00')
    expect(result).toBe('2023-12-25')
  })

  it('should return empty string for invalid date string', () => {
    const result = formatDate('invalid-date')
    expect(result).toBe('')
  })

  it('should return empty string for empty string', () => {
    const result = formatDate('')
    expect(result).toBe('')
  })

  it('should handle date string without time', () => {
    const result = formatDate('2023-12-25')
    expect(result).toBe('2023-12-25')
  })

  it('should handle malformed date string', () => {
    const result = formatDate('2023-13-40T25:70:99.999Z')
    expect(result).toBe('')
  })
})
