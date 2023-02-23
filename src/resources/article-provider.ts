import {getData} from '@/resources/api';

export type Article = {
	userId: number;
	id: number;
	title: string;
	body: string;
	image?: Image;
	comments: Comment[] | null;
}


export type Image = {
	userId: number;
	/**
	 * Relation to "Article.id"
	 */
	id: number;
	title: string;
}

export type  Comment = {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

/**
 * Dummy api that returns 100 articles
 * @type {string}
 */
const API_URL_ARTICLES = 'https://jsonplaceholder.typicode.com/posts';

export async function getAllArticles(): Promise<Article[]> {

	/**
	 * This returns exactly 100 posts. No limit or offset support.
	 */
	return getData<Article[]>(API_URL_ARTICLES);
}

export async function getCommentsByArticle(articleId: number): Promise<Comment[]> {

	return getData(API_URL_ARTICLES + '/' + articleId + '/comments');
}

export async function getArticleImage(articleId: number) {
	return getData(API_URL_ARTICLES + '/' + articleId + '/photos');
}
