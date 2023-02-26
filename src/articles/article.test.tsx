import { render } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { articleCommentsResponseMock, articleResponseMock } from '@/resources/__mocks__/articles'
import { Article } from '@/articles/article'
import { getArticleComments, type IArticle } from '@/resources/article-provider'
import { ArticleComment, type ArticleCommentProps } from '@/articles/article-comment'
import { useArticle } from '@/articles/article-context-provider'
import { createSignal } from 'solid-js'

vi.mock('@/resources/article-provider')
vi.mock('@/articles/article-comment')
vi.mock('@/articles/article-context-provider')

const getArticleCommentsMock = vi.mocked(getArticleComments)

const useArticleMock = vi.mocked(useArticle)
const [mockedArticle, setArticleMock] = createSignal<IArticle | undefined>()
useArticleMock.mockImplementation(() => [mockedArticle, setArticleMock])

const ArticleCommentMock = vi.mocked(ArticleComment)
const articleCommentPropsSpy = vi.fn()
ArticleCommentMock.mockImplementation((props: ArticleCommentProps) => {
  articleCommentPropsSpy(props)
  return <div data-testid="article-comment"/>
})
describe('<Article />', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  test('render', () => {
    getArticleCommentsMock.mockResolvedValueOnce([])

    const article = articleResponseMock[0]
    setArticleMock(article)
    const { container, unmount, queryByText } = render(() => <Article/>)
    expect(container.outerHTML).toMatchSnapshot()
    expect(container.querySelector('.article__title')?.textContent).toEqual(article.title)
    expect(container.querySelector('.article__body')?.textContent).toEqual(article.body)
    expect(queryByText('Loading comments...')).toBeInTheDocument()
    unmount()
  })
  test('loading comments', async () => {
    getArticleCommentsMock.mockResolvedValueOnce(articleCommentsResponseMock)

    const article = articleResponseMock[0]
    setArticleMock(article)
    const { queryByText, getAllByTestId, unmount } = render(() => <Article/>)
    await vi.advanceTimersToNextTimerAsync()
    expect(queryByText('Loading comments...')).not.toBeInTheDocument()
    expect(getAllByTestId('article-comment').length).toEqual(articleCommentsResponseMock.length)
    unmount()
  })
})
