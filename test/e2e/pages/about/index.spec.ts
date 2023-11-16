import { test, expect } from '@playwright/test'

test('title', async ({ page }) => {
  await page.goto('/about')

  await expect(page).toHaveTitle('About - @kimulaco/blog')
})
