import {render} from '@solidjs/testing-library';
import {ArticleList} from '@/articles/article-list';
import {beforeEach, afterEach, expect} from 'vitest';
import {Article, getAllArticles} from '@/resources/article-provider';

vi.mock('@/resources/article-provider');

const getAllArticlesMock = vi.mocked(getAllArticles);

describe('<ArticleList />', () => {

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.clearAllMocks();
	});

	test('render', async () => {

		getAllArticlesMock.mockResolvedValueOnce([
			{
				title: 'Foo bar'
			} as unknown as Article
		]);

		const {getByText, unmount, container} = render(() => <ArticleList/>);
		expect(getByText('Latest topics')).toBeInTheDocument();
		expect(container.innerHTML).toMatchSnapshot('loading');

		await vi.advanceTimersToNextTimerAsync();

		expect(getByText('Foo bar')).toBeInTheDocument();
		expect(container.innerHTML).toMatchSnapshot('articles loaded');

		unmount();
	});
});
