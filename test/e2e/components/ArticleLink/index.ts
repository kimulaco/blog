import { expect, type Locator } from '@playwright/test'
import { getArticleType, type Article } from '@/core/domains/article'
import { testArticleTimestamp } from '@@/test/e2e/components/ArticleTimestamp'
import { testArticleTags } from '@@/test/e2e/components/ArticleTags'

export const testArticleLink = async (
  locator: Locator,
  article: Article
): Promise<void> => {
  const isZenn = getArticleType(article) === 'zenn'
  const expectedHref = isZenn ? article.content : `/article/${article.id}`
  const heading = locator.locator('h3 a')
  expect(await heading.getAttribute('href')).toBe(expectedHref)
  expect((await heading.textContent())?.trim()).toContain(article.title.trim())

  await expect(
    locator.locator('.description', {
      hasText: article.description,
    })
  ).toBeVisible()

  await testArticleTimestamp(locator.locator('.timestamp'), article)
  await testArticleTags(locator.locator('.tags'), article)
}
