import { createCachedSelector } from 're-reselect';

import { AsyncActionCreator, getQueryName } from 'src/shared/storeUtils';
import { RootState } from '../reducers';

export const selectApi = (state: RootState) => state.api;

type SelectQueryStatusProps = {
    actionCreator: AsyncActionCreator;
    requestParams: any;
};

/**
 * Returns API query status by async action creator and request parameters
 */
export const selectQueryStatus = createCachedSelector(
    selectApi,
    (_state: RootState, props: SelectQueryStatusProps) => props,
    (api, props) => {
        const queryName = getQueryName(props.actionCreator, props.requestParams);
        return {
            status: api[queryName],
            isRequest: api[queryName] === 'request',
            isSuccess: api[queryName] === 'success',
            isFailure: api[queryName] === 'failure',
        };
    },
)((_state, props) => getQueryName(props.actionCreator, props.requestParams));
