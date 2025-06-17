import fs from 'fs'
import path from 'path'

const ROOT_DIR = process.cwd()
const BUILD_CACHE_DIR_NAME = '.build-cache'
const BUILD_CACHE_DIR = path.join(ROOT_DIR, BUILD_CACHE_DIR_NAME)
const ENCODING = 'utf-8'

export type BuildCacheValuesBase = Record<string, unknown>

export const useBuildCache = <T extends BuildCacheValuesBase>(key: string) => {
  const get = async (): Promise<T | null> => {
    const cacheFilePath = path.join(BUILD_CACHE_DIR, `${key}.json`)
    if (!fs.existsSync(cacheFilePath)) {
      return null
    }

    const value = fs.readFileSync(cacheFilePath, ENCODING)
    const json = JSON.parse(value)
    return json as T
  }

  const save = async (value: T) => {
    if (!fs.existsSync(BUILD_CACHE_DIR)) {
      fs.mkdirSync(BUILD_CACHE_DIR, {
        recursive: true,
      })
    }

    const cacheFilePath = path.join(BUILD_CACHE_DIR, `${key}.json`)
    fs.writeFileSync(cacheFilePath, JSON.stringify(value, null, 2), {
      encoding: ENCODING,
    })
  }

  const override = async (value: T) => {
    const cachedValue = await get()
    await save({
      ...(cachedValue || {}),
      ...value,
    })
  }

  const clear = async () => {
    const cacheFilePath = path.join(BUILD_CACHE_DIR, `${key}.json`)
    if (fs.existsSync(cacheFilePath)) {
      fs.unlinkSync(cacheFilePath)
    }
  }

  return {
    get,
    save,
    override,
    clear,
  }
}
