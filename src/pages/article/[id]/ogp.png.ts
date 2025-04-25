import type { APIRoute } from 'astro'
import { generateOgpImage } from '@/core/domains/ogp'
import { getArticleDetail, getAllArticles } from '@/core/domains/article'

export const GET: APIRoute = async ({ params }) => {
  const articleId = params.id

  if (!articleId) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const article = await getArticleDetail(articleId)
  const png = await generateOgpImage(article.title)

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}

export const getStaticPaths = async () => {
  const articles = await getAllArticles()
  return articles.map((article) => ({ params: { id: article.id } }))
}
