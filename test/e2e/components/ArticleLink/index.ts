import { expect, type Locator } from '@playwright/test'
import { type Article } from '@/core/domains/article'
import { testArticleTimestamp } from '@@/test/e2e/components/ArticleTimestamp'
import { testArticleTags } from '@@/test/e2e/components/ArticleTags'

export const testArticleLink = async (
  locator: Locator,
  article: Article
): Promise<void> => {
  const heading = locator.locator('h3 a')
  expect(await heading.getAttribute('href')).toBe(`/article/${article.id}`)
  expect((await heading.textContent())?.trim()).toBe(article.title.trim())

  await expect(
    locator.locator('.description', {
      hasText: article.description,
    })
  ).toBeVisible()

  await testArticleTimestamp(locator.locator('.timestamp'), article)
  await testArticleTags(locator.locator('.tags'), article)
}
