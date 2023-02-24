import {getData} from '@/resources/api';
import {getAllArticles, getArticleComments} from '@/resources/article-provider';
import {beforeEach, expect} from 'vitest';
import {articleCommentsResponseMock, articleResponseMock} from '@/resources/__mocks__/articles';

vi.mock('@/resources/api');

const getDataMock = vi.mocked(getData);

describe('ArticleProvider', () => {

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('#getAllArticles', () => {
		it('calls api with correct URL', () => {
			getDataMock.mockResolvedValueOnce(articleResponseMock);
			getAllArticles();
			expect(getDataMock).toBeCalledWith('https://jsonplaceholder.typicode.com/posts');
		});
	});
	describe('#getCommentsByArticle', () => {
		it('calls api with correct URL', () => {
			getDataMock.mockResolvedValueOnce(articleCommentsResponseMock);
			getArticleComments(123);
			expect(getDataMock).toBeCalledWith('https://jsonplaceholder.typicode.com/posts/123/comments');
		});
	});
});
