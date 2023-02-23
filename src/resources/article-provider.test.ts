import {getData} from '@/resources/api';
import {getAllArticles, getArticleImage, getCommentsByArticle} from '@/resources/article-provider';
import {beforeEach, expect} from 'vitest';

vi.mock('@/resources/api');

const getDataMock = vi.mocked(getData);

describe('ArticleProvider', () => {

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('#getAllArticles', () => {
		it('calls api with correct URL', () => {
			getAllArticles();
			expect(getDataMock).toBeCalledWith('https://jsonplaceholder.typicode.com/posts');
		});
	});
	describe('#getCommentsByArticle', () => {
		it('calls api with correct URL', () => {
			getCommentsByArticle(123);
			expect(getDataMock).toBeCalledWith('https://jsonplaceholder.typicode.com/posts/123/comments');
		});
	});
	describe('#getArticleImage', () => {
		it('calls api with correct URL', () => {
			getArticleImage(123);
			expect(getDataMock).toBeCalledWith('https://jsonplaceholder.typicode.com/posts/123/photos');
		});
	});
});
