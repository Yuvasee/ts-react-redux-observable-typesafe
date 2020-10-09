import { createStore, Store } from 'redux';

import { setQueryStatus } from '../actions/api';
import apiReducer from './api';

describe('apiReducer', () => {
    let store: Store;

    beforeEach(() => {
        store = createStore(apiReducer);
    });

    it('setQueryStatus: updates query status', () => {
        store.dispatch(setQueryStatus({ name: 'query name', status: 'request' }));
        expect(store.getState()['query name']).toEqual('request');

        store.dispatch(setQueryStatus({ name: 'query name', status: 'success' }));
        expect(store.getState()['query name']).toEqual('success');
    });

    it('setQueryStatus: not updates state if query status has not changed', () => {
        store.dispatch(setQueryStatus({ name: 'query name', status: 'request' }));
        const stateSnapshot = store.getState();
        expect(stateSnapshot['query name']).toEqual('request');

        store.dispatch(setQueryStatus({ name: 'query name', status: 'request' }));
        expect(store.getState()).toMatchObject(stateSnapshot);
    });
});
