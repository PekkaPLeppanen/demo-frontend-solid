import {render} from 'solid-js/web';
import {ArticleList} from './articles/article-list';
import '@/index.scss';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
	);
}

function App() {
	return (
		<>
			<main>
				<ArticleList/>
			</main>
		</>
	);
}

render(() => <App/>, root!);
