import { expect, type Locator } from '@playwright/test'
import { type Article } from '@/core/domains/article'

export const testArticleTags = async (
  locator: Locator,
  article: Article
): Promise<void> => {
  for (const tag of article.tag) {
    await expect(
      locator.locator(`.ArticleTags_link[href="/tag/${tag.id}/"]`, {
        hasText: tag.name,
      })
    ).toBeVisible()
  }
}
