import { expect, type Locator } from '@playwright/test'
import { type Article } from '@/core/domains/article'
import { testArticleTimestamp } from '@@/test/e2e/components/ArticleTimestamp'
import { testArticleTags } from '@@/test/e2e/components/ArticleTags'

export const testArticleLink = async (
  locator: Locator,
  article: Article
): Promise<void> => {
  const heading = locator.locator('.ArticleLink_heading-link')
  expect(await heading.getAttribute('href')).toBe(`/article/${article.id}`)
  expect(await heading.textContent()).toBe(article.title)

  await expect(
    locator.locator('.ArticleLink_description', {
      hasText: article.description,
    })
  ).toBeVisible()

  await testArticleTimestamp(locator.locator('.ArticleLink_timestamp'), article)
  await testArticleTags(locator.locator('.ArticleLink_tags'), article)
}
