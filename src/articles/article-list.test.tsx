import { render } from '@solidjs/testing-library'
import { ArticleList } from '@/articles/article-list'
import { afterEach, beforeEach, expect } from 'vitest'
import { getAllArticles } from '@/resources/article-provider'
import { articleResponseMock } from '@/resources/__mocks__/articles'
import { Article, type ArticleProps } from '@/articles/article'

vi.mock('@/resources/article-provider')
vi.mock('@/articles/article')

const getAllArticlesMock = vi.mocked(getAllArticles)

const ArticleMock = vi.mocked(Article)
const articlePropsSpy = vi.fn()
ArticleMock.mockImplementation((props: ArticleProps) => {
  articlePropsSpy(props)
  return <div data-testid="article"/>
})

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
})
