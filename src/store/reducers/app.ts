import { createReducer } from 'typesafe-actions';

import { RootAction } from '../actions';
import * as actions from '../actions/app';
import { GetDataRes } from '../../api/endpoints';
import { updatePrimitiveValue } from 'src/shared/storeUtils';

export interface AppState {
    data: GetDataRes;
}

const initState: AppState = {
    data: [],
};

const appReducer = createReducer<AppState, RootAction>(initState)
    // Add primivite value reducers here
    .handleAction(actions.getData.success, updatePrimitiveValue('data'))
    // Add custom reducers here
    .handleAction(actions.getData.request, (state, _action) => {
        return state;
    });

export default appReducer;
