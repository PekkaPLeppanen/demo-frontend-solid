import { render } from '@solidjs/testing-library'
import { ArticleComment } from '@/articles/article-comment'
import { expect } from 'vitest'
import { articleCommentsResponseMock } from '@/resources/__mocks__/articles'

describe('<ArticleComment />', () => {
  test('render', async () => {
    const articleComment = articleCommentsResponseMock[0]
    const { container, getByText, unmount } = render(() => <ArticleComment comment={articleComment}/>)
    expect(container.outerHTML).toMatchSnapshot()
    expect(getByText(articleComment.body)).toBeInTheDocument()
    expect(getByText(articleComment.email)).toBeInTheDocument()
    unmount()
  })
})
