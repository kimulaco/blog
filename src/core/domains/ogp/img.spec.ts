import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'fs'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { generateOgpImage } from './img'

vi.mock('fs')
vi.mock('satori', () => ({ default: vi.fn() }))
vi.mock('@resvg/resvg-js', () => ({ Resvg: vi.fn() }))

describe('generateOgpImage', () => {
  const mockFontBuffer = Buffer.from('font')
  const mockIconBuffer = Buffer.from('icon')
  const mockSvg = '<svg></svg>'
  const mockPng = Buffer.from('png')

  beforeEach(() => {
    vi.clearAllMocks()

    const mockFs = vi.mocked(fs)
    // oxlint-disable-next-line typescript/no-explicit-any
    mockFs.readFileSync.mockReturnValueOnce(mockFontBuffer as any)
    // oxlint-disable-next-line typescript/no-explicit-any
    mockFs.readFileSync.mockReturnValueOnce(mockIconBuffer as any)

    vi.mocked(satori).mockResolvedValue(mockSvg)

    const mockAsPng = vi.fn().mockReturnValue(mockPng)
    const mockRender = vi.fn().mockReturnValue({ asPng: mockAsPng })
    vi.mocked(Resvg).mockImplementation(function () {
      // oxlint-disable-next-line typescript/no-explicit-any
      return { render: mockRender } as any
    })
  })

  it('should return PNG buffer', async () => {
    const result = await generateOgpImage('Test Article')
    expect(result).toBe(mockPng)
  })

  it('should call satori with correct width and height', async () => {
    await generateOgpImage('Title')
    expect(vi.mocked(satori)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ width: 1200, height: 630 })
    )
  })

  it('should call satori with Noto Sans JP font', async () => {
    await generateOgpImage('Title')
    expect(vi.mocked(satori)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        fonts: [
          expect.objectContaining({
            name: 'Noto Sans JP',
            data: mockFontBuffer,
          }),
        ],
      })
    )
  })

  it('should read font and icon files from disk', async () => {
    await generateOgpImage('Title')
    expect(vi.mocked(fs).readFileSync).toHaveBeenCalledTimes(2)
  })

  it('should pass icon as base64 to the OGP component', async () => {
    await generateOgpImage('Title')
    const expectedBase64 = mockIconBuffer.toString('base64')
    const satoriCall = vi.mocked(satori).mock.calls[0]
    expect(JSON.stringify(satoriCall[0])).toContain(expectedBase64)
  })
})
