import {applyMiddleware, createStore} from 'redux'
import {rootReducer} from "../reducers";
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, applyMiddleware(thunk));

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;
//
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
//   // other store enhancers if any
// );
// const store = createStore(rootReducer, enhancer);
