import { createSelector } from 'reselect';
import { RootState } from '../reducers';

export const selectApp = (state: RootState) => state.app;

export const selectData = createSelector(selectApp, (app) => app.data);
