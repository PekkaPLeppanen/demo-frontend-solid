import { render } from 'solid-js/web'
import { ArticleList } from './articles/article-list'
import '@/index.scss'
import { type JSXElement } from 'solid-js'
import { Route, Router, Routes } from '@solidjs/router'
import { Article } from '@/articles/article'
import { ArticleContextProvider } from '@/articles/article-context-provider'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
  )
}

const App: JSXElement = () => {
  return (
    <>
      <main>
        <Routes>
          <ArticleContextProvider>
            <Route path="/" component={ArticleList}/>
            <Route path="/article/:id" component={Article}/>
          </ArticleContextProvider>
        </Routes>
      </main>
    </>
  )
}

render(() => (
  <Router>
    <App/>
  </Router>
), root as HTMLElement)
