import { test, expect } from '@playwright/test'
import { getAllArticles } from '@/core/domains/article'

test('title', async ({ page }) => {
  const articles = await getAllArticles()

  if (articles.length <= 0) {
    throw new Error('tags is empty')
  }

  for (const article of articles) {
    await page.goto(`/article/${article.id}`)

    await expect(page).toHaveTitle(`${article.title} - @kimulaco/blog`)
  }
})
