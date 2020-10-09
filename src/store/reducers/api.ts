import { createReducer } from 'typesafe-actions';

import { RootAction } from '../actions';
import { setQueryStatus } from '../actions/api';

export type QueryStatus = 'request' | 'success' | 'failure';
export type ApiState = Record<string, QueryStatus>;

const apiReducer = createReducer<ApiState, RootAction>({}).handleAction(setQueryStatus, (state, { payload }) => {
    if (state[payload.name] === payload.status) {
        return state;
    }
    return {
        ...state,
        [payload.name]: payload.status,
    };
});

export default apiReducer;
