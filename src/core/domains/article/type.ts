export type Article = {
  id: string
  created_at: string
  updated_at?: string
  publish: boolean
  title: string
  description: string
  image?: ArticleThumbnail
  category: ArticleCategory
  tag: ArticleTag[]
  content: string
  related_posts: Article[]
}

export type ArticleThumbnail = {
  url: string
}

export type ArticleCategory = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  description: string
}

export type ArticleTag = {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
}
