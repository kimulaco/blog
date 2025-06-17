import { generateArticleCache } from '../src/core/domains/article'
import { generateAboutCache } from '../src/core/domains/about'

try {
  console.log(`start generating build caches...`)

  await Promise.all([
    generateArticleCache().then(() =>
      console.log(`completed generate article build cache.`)
    ),
    generateAboutCache().then(() =>
      console.log(`completed generate about build cache.`)
    ),
  ])

  console.log(`completed generating all build caches.`)
} catch (error) {
  console.error(error)
  process.exit(1)
}
