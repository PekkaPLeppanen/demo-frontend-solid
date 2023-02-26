import { type Component } from 'solid-js'
import { type IArticleComment } from '@/resources/article-provider'
import '@/articles/article-comment.scss'

export interface ArticleCommentProps {
  comment: IArticleComment
}

export const ArticleComment: Component<ArticleCommentProps> = (props) => {
  return (
    <div class="article-comment">
      <div class="article-comment__email">{props.comment.email}</div>
      <div class="article-comment__body">{props.comment.body}</div>
    </div>
  )
}
