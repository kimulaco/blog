import { expect, type Locator } from '@playwright/test'
import { type Article } from '@/core/domains/article'
import { formatDate } from '@/core/utilities/formatDate'

export const testArticleTimestamp = async (
  locator: Locator,
  article: Article
): Promise<void> => {
  await expect(
    locator.locator('.Timestamp_title', {
      hasText: '投稿日:',
    })
  ).toBeVisible()
  await expect(
    locator.locator('.Timestamp_date', {
      hasText: formatDate(article.created_at),
    })
  ).toBeVisible()

  expect(
    await locator
      .locator('.Timestamp_title', {
        hasText: '更新日:',
      })
      .isVisible()
  ).toBe(!!article.updated_at)
  if (article.updated_at) {
    await expect(
      locator.locator('.Timestamp_date', {
        hasText: formatDate(article.updated_at),
      })
    ).toBeVisible()
  }
}
