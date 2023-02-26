import { createContext, createSignal, type FlowProps, type JSX, type Signal, useContext } from 'solid-js'
import { type IArticle } from '@/resources/article-provider'

type IArticleContext = Signal<IArticle | undefined>

/**
 * What is returned here can be accessed in the child components of the ArticleProvider through useArticle()
 */
const makeArticleContext = (article?: IArticle): IArticleContext => {
  return createSignal(article)
}

const ArticleContext = createContext<IArticleContext>(makeArticleContext())

/**
 * Creates a context provider component, where all the children have access to the ArticleContext
 *
 * @see https://www.solidjs.com/docs/latest/api#createcontext
 *
 * @param props
 * @constructor
 */
export function ArticleContextProvider (props: FlowProps): JSX.Element {
  return (
    <ArticleContext.Provider value={makeArticleContext()}>
      {props.children}
    </ArticleContext.Provider>
  )
}

/**
 * Usage: const [isMenuOpen, {openMenu, closeMenu}] = useArticle();
 */
export function useArticle (): IArticleContext {
  return useContext(ArticleContext)
}
