import { generateArticleCache } from '../src/core/domains/article'

try {
  console.log(`start generate article cache...`)
  await generateArticleCache()
  console.log(`completed generate article cache.`)
} catch (error) {
  console.error(error)
  process.exit(1)
}
