import { generateArticleCache } from '../src/core/domains/article'
import { generateAboutCache } from '../src/core/domains/about'

try {
  console.log(`start generating build caches...`)

  await Promise.all([
    generateArticleCache().then(({ cacheFilePath }) =>
      console.log(`completed generate article build cache to ${cacheFilePath}.`)
    ),
    generateAboutCache().then(({ cacheFilePath }) =>
      console.log(`completed generate about build cache to ${cacheFilePath}.`)
    ),
  ])

  console.log(`completed generating all build caches.`)
} catch (error) {
  console.error(error)
  process.exit(1)
}
