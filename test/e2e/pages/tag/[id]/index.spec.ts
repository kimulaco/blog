import { test, expect } from '@playwright/test'
import { getAllArticleTags } from '@/core/domains/article'

test('tag detail page', async ({ page }) => {
  const tags = await getAllArticleTags()

  if (tags.length <= 0) {
    throw new Error('tags is empty')
  }

  for (const tag of tags) {
    await page.goto(`/tag/${tag.id}`)

    await expect(page).toHaveTitle(
      `"${tag.name}"のタグを持つ記事 - @kimulaco/blog`
    )
  }
})
