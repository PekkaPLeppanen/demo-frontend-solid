import {Component, createResource, For} from 'solid-js';
import {Article, getAllArticles} from '@/resources/article-provider';
import {Suspense} from 'solid-js/web';
import '@/articles/article-list.scss';

export const Articles: Component = () => {

	const [articles] = createResource(getAllArticles);

	return (
		<>
			<h1>Latest topics</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<ul class="article-list">
					<For each={articles()}>{(article: Article) =>
						<li class="article-list__item">
							{article.title}
						</li>
					}</For>
				</ul>
			</Suspense>
		</>

	);
};
