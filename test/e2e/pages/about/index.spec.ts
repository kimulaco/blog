import { test, expect } from '@playwright/test'

test('about page', async ({ page }) => {
  await page.goto('/about')

  await expect(page).toHaveTitle('About - @kimulaco/blog')
})
