import { expect, type Locator } from '@playwright/test'
import { type Article } from '@/core/domains/article'
import { formatDate } from '@/core/utilities/formatDate'

export const testArticleLink = async (
  locator: Locator,
  article: Article
): Promise<void> => {
  const heading = locator.locator('.ArticleLink_heading-link')
  expect(await heading.getAttribute('href')).toBe(`/article/${article.id}/`)
  expect(await heading.textContent()).toBe(article.title)

  await expect(
    locator.locator('.ArticleLink_description', {
      hasText: article.description,
    })
  ).toBeVisible()

  await expect(
    locator.locator('.ArticleLink_timestamp .Timestamp_title', {
      hasText: '投稿日:',
    })
  ).toBeVisible()
  await expect(
    locator.locator('.ArticleLink_timestamp .Timestamp_date', {
      hasText: formatDate(article.created_at),
    })
  ).toBeVisible()

  expect(
    await locator
      .locator('.ArticleLink_timestamp .Timestamp_title', {
        hasText: '更新日:',
      })
      .isVisible()
  ).toBe(!!article.updated_at)
  if (article.updated_at) {
    await expect(
      locator.locator('.ArticleLink_timestamp .Timestamp_date', {
        hasText: formatDate(article.updated_at),
      })
    ).toBeVisible()
  }

  for (const tag of article.tag) {
    await expect(
      locator.locator(
        `.ArticleLink_tags .ArticleTags_link[href="/tag/${tag.id}/"]`,
        {
          hasText: tag.name,
        }
      )
    ).toBeVisible()
  }
}
