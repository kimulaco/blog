import { test, expect } from '@playwright/test'

test('tag page', async ({ page }) => {
  await page.goto('/tag')

  await expect(page).toHaveTitle('タグ一覧 - @kimulaco/blog')
})
