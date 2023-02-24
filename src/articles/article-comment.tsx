import {Component} from 'solid-js';
import {IArticleComment} from '@/resources/article-provider';
import '@/articles/article-comment.scss';

export type ArticleCommentProps = {
	comment: IArticleComment;
}

export const ArticleComment: Component<ArticleCommentProps> = (props) => {
	return (
		<div class="article-comment">
			<div class="article-comment__email">{props.comment.email}</div>
			<div class="article-comment__body">{props.comment.body}</div>
		</div>
	);
};
