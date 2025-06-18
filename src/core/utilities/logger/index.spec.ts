import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { logger } from './index'

describe('logger', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>
  let originalBuildEnv: string | undefined

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    originalBuildEnv = process.env.BUILD_ENV
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    process.env.BUILD_ENV = originalBuildEnv
  })

  describe('buildInfo()', () => {
    test('should call console.log when BUILD_ENV is development', () => {
      process.env.BUILD_ENV = 'development'
      const testValue = { message: 'test' }

      logger.buildInfo(testValue)

      expect(consoleLogSpy).toHaveBeenCalledWith('[buildInfo] ', testValue)
      expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    })

    test('should not call console.log when BUILD_ENV is production', () => {
      process.env.BUILD_ENV = 'production'
      const testValue = { message: 'test' }

      logger.buildInfo(testValue)

      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    test('should not call console.log when BUILD_ENV is undefined', () => {
      delete process.env.BUILD_ENV
      const testValue = { message: 'test' }

      logger.buildInfo(testValue)

      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    test('should handle different value types', () => {
      process.env.BUILD_ENV = 'development'

      logger.buildInfo('string value')
      logger.buildInfo(123)
      logger.buildInfo(true)
      logger.buildInfo(null)
      logger.buildInfo(undefined)

      expect(consoleLogSpy).toHaveBeenCalledWith('[buildInfo] ', 'string value')
      expect(consoleLogSpy).toHaveBeenCalledWith('[buildInfo] ', 123)
      expect(consoleLogSpy).toHaveBeenCalledWith('[buildInfo] ', true)
      expect(consoleLogSpy).toHaveBeenCalledWith('[buildInfo] ', null)
      expect(consoleLogSpy).toHaveBeenCalledWith('[buildInfo] ', undefined)
      expect(consoleLogSpy).toHaveBeenCalledTimes(5)
    })

    test('should handle complex objects', () => {
      process.env.BUILD_ENV = 'development'
      const complexObject = {
        nested: { value: 'test' },
        array: [1, 2, 3],
        func: () => 'test',
      }

      logger.buildInfo(complexObject)

      expect(consoleLogSpy).toHaveBeenCalledWith('[buildInfo] ', complexObject)
      expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    })
  })
})
