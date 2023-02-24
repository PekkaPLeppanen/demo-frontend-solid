import { getData } from '@/resources/api'

export interface IArticle {
  userId: number
  id: number
  title: string
  body: string
}

export interface IArticleComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

function capitalizeFirstLetter (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Dummy api that returns 100 articles
 * @type {string}
 */
const API_URL_ARTICLES = 'https://jsonplaceholder.typicode.com/posts'

export async function getAllArticles (): Promise<IArticle[]> {
  /**
   * This returns exactly 100 posts. No limit or offset support.
   */
  const articles = await getData<IArticle[]>(API_URL_ARTICLES)

  return articles.map(article => {
    article.title = capitalizeFirstLetter(article.title)
    article.body = capitalizeFirstLetter(article.body)
    return article
  })
}

export async function getArticleComments (articleId: number): Promise<IArticleComment[]> {
  const comments = await getData<IArticleComment[]>(`${API_URL_ARTICLES}/${articleId}/comments`)

  return comments.map(comment => {
    comment.body = capitalizeFirstLetter(comment.body)
    return comment
  })
}
