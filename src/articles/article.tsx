import {Component, createResource, For} from 'solid-js';
import {getArticleComments, IArticle, IArticleComment} from '@/resources/article-provider';
import {Suspense} from 'solid-js/web';
import {ArticleComment} from '@/articles/article-comment';
import '@/articles/article.scss';

export type ArticleProps = {
	article: IArticle;
}

export const Article: Component<ArticleProps> = (props) => {

	const [comments] = createResource(() => props.article.id, getArticleComments);

	return (
		<div class="article">
			<h2 class="article__title">{props.article.title}</h2>
			<p class="article__body">{props.article.body}</p>
			<Suspense fallback={<p>Loading comments...</p>}>
				<For each={comments()}>{(comment: IArticleComment) =>
					<ArticleComment comment={comment}/>
				}</For>
			</Suspense>
		</div>
	);

};
