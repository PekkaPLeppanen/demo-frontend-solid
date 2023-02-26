import { type Component, createResource, For } from 'solid-js'
import { getAllArticles, type IArticle } from '@/resources/article-provider'
import { Suspense } from 'solid-js/web'
import '@/articles/article-list.scss'
import { A } from '@solidjs/router'
import { useArticle } from '@/articles/article-context-provider'

export const ArticleList: Component = () => {
  const [, selectArticle] = useArticle()
  const [articles] = createResource(getAllArticles)

  return (
    <>
      <h1>Latest topics</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ul class="article-list">
          <For each={articles()}>{(article: IArticle) =>
            <li class="article-list__item">
              <A href={`/article/${article.id}`} onClick={() => {
                selectArticle(article)
              }}>{article.title}</A>
            </li>
          }</For>
        </ul>
      </Suspense>
    </>

  )
}
