import { test, expect } from '@playwright/test'
import { getUsedAllTags } from '@/core/domains/article'

test('title', async ({ page }) => {
  const tags = await getUsedAllTags()

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
