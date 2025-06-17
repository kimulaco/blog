export type Article = {
  id: string
  created_at: string
  updated_at?: string
  publish: boolean
  title: string
  description: string
  image?: ArticleThumbnail
  tag: ArticleTag[]
  content: string
  related_posts: Article[]
}

export type ArticleThumbnail = {
  url: string
}

export type ArticleTag = {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export type GetArticleListParams = {
  tagId?: string
}
