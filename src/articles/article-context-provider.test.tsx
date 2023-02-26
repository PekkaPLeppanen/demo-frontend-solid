import { ArticleContextProvider, useArticle } from '@/articles/article-context-provider'
import { render } from '@solidjs/testing-library'
import { type JSX } from 'solid-js'
import { expect } from 'vitest'

const ArticleContextChild = (): JSX.Element => {
  const [article] = useArticle()

  return (
    <>
      {
        (article() != null)
          ? <>
            <span data-testid="title">article().title</span>
            <span data-testid="title">article().body</span>
          </>
          : <span data-testid="empty">No article</span>
      }
    </>
  )
}

describe('ArticleContextProvider', () => {
  test('context model', async () => {
    const TestComponent = (): JSX.Element => (
      <ArticleContextProvider>
        <ArticleContextChild/>
      </ArticleContextProvider>
    )
    const { getByTestId } = render(() => <TestComponent/>)
    expect(getByTestId('empty')).toBeInTheDocument()
  })
})
