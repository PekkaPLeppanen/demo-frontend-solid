import {Component, createResource, createSignal, For} from 'solid-js';
import {getAllArticles, IArticle} from '@/resources/article-provider';
import {Suspense} from 'solid-js/web';
import '@/articles/article-list.scss';
import {Article} from '@/articles/article';

export const ArticleList: Component = () => {

	const [articles] = createResource(getAllArticles);
	const [selectedArticle, setSelectedArticle] = createSignal<IArticle>();

	return (
		<>
			<h1>Latest topics</h1>
			{selectedArticle() && <Article article={selectedArticle() as IArticle}/>}
			<Suspense fallback={<p>Loading...</p>}>
				<ul class="article-list">
					<For each={articles()}>{(article: IArticle) =>
						<li class="article-list__item" onClick={() => setSelectedArticle(article)}>
							{article.title}
						</li>
					}</For>
				</ul>
			</Suspense>
		</>

	);
};
