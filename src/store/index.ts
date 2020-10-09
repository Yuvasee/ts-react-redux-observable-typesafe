import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { RootAction } from './actions';
import { rootEpic } from './epics';
import rootReducer, { RootState } from './reducers';

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, void>();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store;
