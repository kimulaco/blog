import { test, expect } from '@playwright/test'
import { getAllArticles } from '@/core/domains/article'
import { testArticleLink } from '@@/test/e2e/components/ArticleLink'

test('top page', async ({ page }) => {
  const articles = await getAllArticles()

  if (articles.length <= 0) {
    throw new Error('articles is empty')
  }

  await page.goto('/')

  await expect(page).toHaveTitle('@kimulaco/blog')

  const articleLinks = await page.locator('section.item').all()

  expect(articleLinks).toHaveLength(articles.length)

  for (let i = 0; i < articles.length; i++) {
    await testArticleLink(articleLinks[i], articles[i])
  }
})
