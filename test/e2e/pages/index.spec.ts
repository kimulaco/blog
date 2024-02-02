import { test, expect } from '@playwright/test'

test('top page', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('@kimulaco/blog')
})
