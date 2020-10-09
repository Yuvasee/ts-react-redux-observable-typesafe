import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import api from './api';
import app from './app';

const rootReducer = combineReducers({
    api,
    app,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
