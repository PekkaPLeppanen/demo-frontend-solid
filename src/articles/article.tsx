import { type Component, createResource, For } from 'solid-js'
import { getArticleComments, type IArticle, type IArticleComment } from '@/resources/article-provider'
import { Suspense } from 'solid-js/web'
import { ArticleComment } from '@/articles/article-comment'
import '@/articles/article.scss'
import { useArticle } from '@/articles/article-context-provider'

export interface ArticleProps {
  article: IArticle
}

export const Article: Component = () => {
  const [article] = useArticle()
  const [comments] = createResource(article()?.id, getArticleComments)

  return (
    <div class="article">
      <h2 class="article__title">{article()?.title}</h2>
      <p class="article__body">{article()?.body}</p>
      <Suspense fallback={<p>Loading comments...</p>}>
        <For each={comments()}>{(comment: IArticleComment) =>
          <ArticleComment comment={comment}/>
        }</For>
      </Suspense>
    </div>
  )
}
