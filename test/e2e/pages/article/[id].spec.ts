import { test, expect, type Page } from '@playwright/test'
import { getAllArticles, type Article } from '@/core/domains/article'
import { formatDate } from '@/core/utilities/formatDate'
import { convertMdToHtml } from '@/core/utilities/markdown'
import { unescapeHTML } from '@@/test/utilities/unescapeHTML'

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
    page.locator('.PostDetail_heading', {
      hasText: article.title,
    })
  ).toBeVisible()

  await expect(
    page.locator('.PostDetail_head .Timestamp_title', {
      hasText: '投稿日:',
    })
  ).toBeVisible()
  await expect(
    page.locator('.PostDetail_head .Timestamp_date', {
      hasText: formatDate(article.created_at),
    })
  ).toBeVisible()

  expect(
    await page
      .locator('.PostDetail_head .Timestamp_title', {
        hasText: '更新日:',
      })
      .isVisible()
  ).toBe(!!article.updated_at)
  if (article.updated_at) {
    await expect(
      page.locator('.PostDetail_head .Timestamp_date', {
        hasText: formatDate(article.updated_at),
      })
    ).toBeVisible()
  }

  for (const tag of article.tag) {
    await expect(
      page.locator(
        `.PostDetail_head .ArticleTags_link[href="/tag/${tag.id}/"]`,
        {
          hasText: tag.name,
        }
      )
    ).toBeVisible()
  }

  const content = page.locator('.PostContent')
  await expect(content).toBeVisible()
  expect(await content.innerHTML()).toBe(
    unescapeHTML(convertMdToHtml(article.content))
  )
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
