/*
 * Npm import
 */
import { createStore ,applyMiddleware, compose} from 'redux';
import reducer from './reducer';
/*
 * Local import
 */
// Reducer
import ajaxMiddleware from './ajaxMiddleware';


/*
 * Code
 */

const appliedMiddlewares = applyMiddleware(ajaxMiddleware);
const devTools = [];
if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}
// On se crée une variable pour "composer" avec notre propre middleware
// et celui fourni par les devTools. Les enhancers représentent TOUS les 
// middlewares utilisés par mon app, internes, comme externes
const enhancers = compose(appliedMiddlewares, ...devTools);
const store = createStore(reducer, enhancers);

/*
 * Export
 */
export default store;