import { fireEvent, render } from '@solidjs/testing-library'
import { ArticleList } from '@/articles/article-list'
import { afterEach, beforeEach, expect } from 'vitest'
import { getAllArticles, type IArticle } from '@/resources/article-provider'
import { articleResponseMock } from '@/resources/__mocks__/articles'
import { A, type AnchorProps } from '@solidjs/router'
import { useArticle } from '@/articles/article-context-provider'
import { createSignal } from 'solid-js'

vi.mock('@/resources/article-provider')
vi.mock('@/articles/article-context-provider')
vi.mock('@solidjs/router')

const getAllArticlesMock = vi.mocked(getAllArticles)

const AnchorMock = vi.mocked(A)
AnchorMock.mockImplementation((props: AnchorProps) => {
  if (props.onClick === undefined) {
    throw new Error('onClick not found')
  }

  return <a data-testid="anchor" onClick={props.onClick}>{props.children}</a>
})

const useArticleMock = vi.mocked(useArticle)
const [mockedArticle, setArticleMock] = createSignal<IArticle | undefined>()
useArticleMock.mockImplementation(() => [mockedArticle, setArticleMock])

describe('<ArticleList />', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  test('render', async () => {
    getAllArticlesMock.mockResolvedValueOnce(articleResponseMock)

    const { getByText, unmount, container } = render(() => <ArticleList/>)
    expect(getByText('Latest topics')).toBeInTheDocument()
    expect(container.innerHTML).toMatchSnapshot('loading')

    await vi.advanceTimersToNextTimerAsync()

    expect(getByText(articleResponseMock[0].title)).toBeInTheDocument()
    expect(getByText(articleResponseMock[1].title)).toBeInTheDocument()
    expect(container.innerHTML).toMatchSnapshot('articles loaded')

    unmount()
  })
  test('navigation', async () => {
    getAllArticlesMock.mockResolvedValueOnce(articleResponseMock)

    const { getByText, unmount } = render(() => <ArticleList/>)
    await vi.advanceTimersToNextTimerAsync()

    const firstArticleTitle = getByText(articleResponseMock[0].title)

    expect(mockedArticle()).toEqual(undefined)
    fireEvent.click(firstArticleTitle)
    expect(mockedArticle()).toEqual(articleResponseMock[0])

    unmount()
  })
})
