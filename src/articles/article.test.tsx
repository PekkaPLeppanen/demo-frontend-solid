import {render} from '@solidjs/testing-library';
import {afterEach, beforeEach, describe, expect, test} from 'vitest';
import {articleCommentsResponseMock, articleResponseMock} from '@/resources/__mocks__/articles';
import {Article} from '@/articles/article';
import {getArticleComments} from '@/resources/article-provider';
import {ArticleComment, ArticleCommentProps} from '@/articles/article-comment';

vi.mock('@/resources/article-provider');
vi.mock('@/articles/article-comment');

const getArticleCommentsMock = vi.mocked(getArticleComments);

const ArticleCommentMock = vi.mocked(ArticleComment);
const articleCommentPropsSpy = vi.fn();
ArticleCommentMock.mockImplementation((props: ArticleCommentProps) => {
	articleCommentPropsSpy(props);
	return <div data-testid="article-comment"/>;
});
describe('<Article />', () => {

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.clearAllMocks();
	});

	test('render', () => {
		getArticleCommentsMock.mockResolvedValueOnce([]);

		const article = articleResponseMock[0];
		const {container, unmount, queryByText} = render(() => <Article article={article}/>);
		expect(container.outerHTML).toMatchSnapshot();
		expect(container.querySelector('.article__title')?.textContent).toEqual(article.title);
		expect(container.querySelector('.article__body')?.textContent).toEqual(article.body);
		expect(queryByText('Loading comments...')).toBeInTheDocument();
		unmount();
	});
	test('loading comments', async () => {
		getArticleCommentsMock.mockResolvedValueOnce(articleCommentsResponseMock);

		const article = articleResponseMock[0];
		const {queryByText, getAllByTestId, unmount} = render(() => <Article article={article}/>);
		await vi.advanceTimersToNextTimerAsync();
		expect(queryByText('Loading comments...')).not.toBeInTheDocument();
		expect(getAllByTestId('article-comment').length).toEqual(articleCommentsResponseMock.length);
		unmount();
	});
});
