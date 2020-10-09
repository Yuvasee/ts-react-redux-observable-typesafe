import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { RootAction } from 'src/store/actions';
import { rootEpic } from 'src/store/epics';
import rootReducer, { RootState } from 'src/store/reducers';

let store: any;

export default () => {
    const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, void>();
    store = createStore(rootReducer, applyMiddleware(epicMiddleware));
    epicMiddleware.run(rootEpic);
    return store;
};
