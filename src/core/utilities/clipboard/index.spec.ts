import { describe, expect, it, vi, beforeEach } from 'vitest'
import { copyToClipboard } from './index'

const mockWrite = vi.fn()
const mockClipboard = {
  write: mockWrite,
}

const mockClipboardItem = vi.fn()

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.ClipboardItem = mockClipboardItem as any

    global.Blob = vi.fn().mockImplementation((content, options) => ({
      content,
      type: options.type,
    }))
  })

  it('should copy text to clipboard successfully', async () => {
    const testText = 'Hello, World!'
    mockWrite.mockResolvedValue(undefined)
    mockClipboardItem.mockImplementation((data) => ({ data }))

    await copyToClipboard(testText)

    expect(global.Blob).toHaveBeenCalledWith([testText], { type: 'text/plain' })
    expect(mockClipboardItem).toHaveBeenCalledWith({
      'text/plain': expect.objectContaining({
        content: [testText],
        type: 'text/plain',
      }),
    })
    expect(mockWrite).toHaveBeenCalledWith([
      { data: { 'text/plain': expect.any(Object) } },
    ])
  })

  it('should handle empty string', async () => {
    const testText = ''
    mockWrite.mockResolvedValue(undefined)
    mockClipboardItem.mockImplementation((data) => ({ data }))

    await copyToClipboard(testText)

    expect(global.Blob).toHaveBeenCalledWith([''], { type: 'text/plain' })
    expect(mockWrite).toHaveBeenCalled()
  })

  it('should handle clipboard write failure', async () => {
    const testText = 'Test text'
    const error = new Error('Clipboard write failed')
    mockWrite.mockRejectedValue(error)
    mockClipboardItem.mockImplementation((data) => ({ data }))

    await expect(copyToClipboard(testText)).rejects.toThrow(
      'Clipboard write failed'
    )
  })

  it('should handle special characters', async () => {
    const testText = '特殊文字 & symbols! 🎉'
    mockWrite.mockResolvedValue(undefined)
    mockClipboardItem.mockImplementation((data) => ({ data }))

    await copyToClipboard(testText)

    expect(global.Blob).toHaveBeenCalledWith([testText], { type: 'text/plain' })
    expect(mockWrite).toHaveBeenCalled()
  })
})
