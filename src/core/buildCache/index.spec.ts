import { describe, test, expect, beforeEach, vi } from 'vitest'
import fs from 'fs'
import path from 'path'
import { useBuildCache } from './index'

vi.mock('fs')

describe('useBuildCache', () => {
  const mockFs = vi.mocked(fs)
  const testKey = 'test-key'
  const testDir = '/tmp/test/cache/dir'
  const testCacheFilePath = path.resolve(testDir, `${testKey}.json`)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('get()', () => {
    test('should return null when cache file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false)

      const cache = useBuildCache(testKey, { dir: testDir })
      const result = await cache.get()

      expect(result).toBeNull()
      expect(mockFs.existsSync).toHaveBeenCalledWith(testCacheFilePath)
    })

    test('should return parsed JSON when cache file exists', async () => {
      const testData = { name: 'test', value: 123 }
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(testData))

      const cache = useBuildCache<typeof testData>(testKey, { dir: testDir })
      const result = await cache.get()

      expect(result).toEqual(testData)
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        testCacheFilePath,
        'utf-8'
      )
    })
  })

  describe('save()', () => {
    test('should create directory and save file when cache directory does not exist', async () => {
      const testData = { name: 'test', value: 123 }
      mockFs.existsSync.mockReturnValue(false)

      const cache = useBuildCache(testKey, { dir: testDir })
      await cache.save(testData)

      expect(mockFs.mkdirSync).toHaveBeenCalledWith(testDir, {
        recursive: true,
      })
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        testCacheFilePath,
        JSON.stringify(testData, null, 2),
        { encoding: 'utf-8' }
      )
    })

    test('should save file only when cache directory exists', async () => {
      const testData = { name: 'test', value: 123 }
      mockFs.existsSync.mockReturnValue(true)

      const cache = useBuildCache(testKey, { dir: testDir })
      await cache.save(testData)

      expect(mockFs.mkdirSync).not.toHaveBeenCalled()
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        testCacheFilePath,
        JSON.stringify(testData, null, 2),
        { encoding: 'utf-8' }
      )
    })
  })

  describe('override()', () => {
    test('should save new value when existing cache does not exist', async () => {
      const testData = { name: 'test', value: 123 }
      mockFs.existsSync.mockReturnValueOnce(false)
      mockFs.existsSync.mockReturnValueOnce(false)

      const cache = useBuildCache(testKey, { dir: testDir })
      await cache.override(testData)

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        testCacheFilePath,
        JSON.stringify(testData, null, 2),
        { encoding: 'utf-8' }
      )
    })

    test('should merge and save when existing cache exists', async () => {
      const existingData = { name: 'existing', count: 1 }
      const newData = { name: 'new', value: 123 }
      const expectedData = { name: 'new', count: 1, value: 123 }

      mockFs.existsSync.mockReturnValueOnce(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingData))
      mockFs.existsSync.mockReturnValueOnce(true)

      const cache = useBuildCache(testKey, { dir: testDir })
      await cache.override(newData)

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        testCacheFilePath,
        JSON.stringify(expectedData, null, 2),
        { encoding: 'utf-8' }
      )
    })
  })

  describe('clear()', () => {
    test('should delete file when cache file exists', async () => {
      mockFs.existsSync.mockReturnValue(true)

      const cache = useBuildCache(testKey, { dir: testDir })
      await cache.clear()

      expect(mockFs.unlinkSync).toHaveBeenCalledWith(testCacheFilePath)
    })

    test('should do nothing when cache file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false)

      const cache = useBuildCache(testKey, { dir: testDir })
      await cache.clear()

      expect(mockFs.unlinkSync).not.toHaveBeenCalled()
    })
  })

  describe('default options', () => {
    test('should use default directory when dir option is not specified', async () => {
      const defaultDir = path.resolve(process.cwd(), 'build-cache')
      const defaultCacheFilePath = path.resolve(defaultDir, `${testKey}.json`)

      mockFs.existsSync.mockReturnValue(false)

      const cache = useBuildCache(testKey)
      await cache.get()

      expect(mockFs.existsSync).toHaveBeenCalledWith(defaultCacheFilePath)
    })
  })

  describe('type safety', () => {
    test('should return correct type based on type parameter', async () => {
      type TestType = { id: number; name: string }
      const testData: TestType = { id: 1, name: 'test' }

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(testData))

      const cache = useBuildCache<TestType>(testKey, { dir: testDir })
      const result = await cache.get()

      expect(result).toEqual(testData)
      expect(typeof result?.id).toBe('number')
      expect(typeof result?.name).toBe('string')
    })
  })
})
