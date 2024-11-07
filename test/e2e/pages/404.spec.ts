import { test, expect } from '@playwright/test'

test('404 page', async ({ page }) => {
  await page.goto('/404')

  await expect(page).toHaveTitle('404 - @kimulaco/blog')
})
