import { test, expect, type Page } from '@playwright/test'
import { getAllArticles, type Article } from '@/core/domains/article'
import { testArticleTags } from '@@/test/e2e/components/ArticleTags'
import { testArticleTimestamp } from '@@/test/e2e/components/ArticleTimestamp'

test('article detail page', async ({ page }) => {
  const articles = await getAllArticles()

  if (articles.length <= 0) {
    throw new Error('articles is empty')
  }

  for (const article of articles) {
    await page.goto(`/article/${article.id}`)

    if (!article.publish) {
      await expect(page).toHaveTitle('404 - @kimulaco/blog')
      return
    }

    await testMetaData(page, article)
    await testPageContent(page, article)
  }
})

const testPageContent = async (page: Page, article: Article) => {
  await expect(
    page.locator('h1', {
      hasText: article.title,
    })
  ).toBeVisible()

  const articleContent = page.locator('article')
  await testArticleTimestamp(articleContent, article)
  await testArticleTags(articleContent, article)
}

const testMetaData = async (page: Page, article: Article) => {
  await expect(page).toHaveTitle(`${article.title} - @kimulaco/blog`)
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    `${article.title} - @kimulaco/blog`
  )
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    'content',
    `${article.title} - @kimulaco/blog`
  )

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    `Webエンジニアの学びと趣味のブログ。${article.description}`
  )
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    `Webエンジニアの学びと趣味のブログ。${article.description}`
  )
  await expect(
    page.locator('meta[name="twitter:description"]')
  ).toHaveAttribute(
    'content',
    `Webエンジニアの学びと趣味のブログ。${article.description}`
  )

  const metaOgUrl = page.locator('meta[property="og:url"]')
  const metaOgUrlValue = await metaOgUrl.getAttribute('content')
  expect(new RegExp(`/article/${article.id}$`).test(metaOgUrlValue || '')).toBe(
    true
  )
}
