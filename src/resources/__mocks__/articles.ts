import {IArticle, IArticleComment} from '@/resources/article-provider';

export const articleResponseMock: IArticle[] = [
	{
		userId: 1,
		id: 1,
		title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
		body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
	},
	{
		userId: 1,
		id: 2,
		title: 'qui est esse',
		body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
	},
];

export const articleCommentsResponseMock: IArticleComment[] = [
	{
		postId: 1,
		id: 1,
		name: 'id labore ex et quam laborum',
		email: 'Eliseo@gardner.biz',
		body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium'
	},
	{
		postId: 1,
		id: 2,
		name: 'quo vero reiciendis velit similique earum',
		email: 'Jayne_Kuhic@sydney.com',
		body: 'est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et'
	},
];
