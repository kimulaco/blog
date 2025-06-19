import fs from 'fs'
import path from 'path'

export type BuildCacheValuesBase = Record<string, unknown>

export type BuildCacheOptions = {
  dir?: string
}

const ENCODING = 'utf-8'

const DEFAULT_OPTIONS: Required<BuildCacheOptions> = {
  dir: path.resolve(process.cwd(), '.build-cache'),
}

export const useBuildCache = <T extends BuildCacheValuesBase>(
  key: string,
  options?: BuildCacheOptions
) => {
  const config = {
    ...DEFAULT_OPTIONS,
    ...(options || {}),
  }

  const cacheDirPath = config.dir
  const cacheFilePath = path.resolve(config.dir, `${key}.json`)

  const get = async (): Promise<T | null> => {
    if (!fs.existsSync(cacheFilePath)) {
      return null
    }

    const value = fs.readFileSync(cacheFilePath, ENCODING)
    const json = JSON.parse(value)
    return json as T
  }

  const save = async (value: T) => {
    if (!fs.existsSync(cacheDirPath)) {
      fs.mkdirSync(cacheDirPath, {
        recursive: true,
      })
    }

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
    if (fs.existsSync(cacheFilePath)) {
      fs.unlinkSync(cacheFilePath)
    }
  }

  const getCacheFilePath = () => {
    return cacheFilePath
  }

  return {
    get,
    save,
    override,
    clear,
    getCacheFilePath,
  }
}
