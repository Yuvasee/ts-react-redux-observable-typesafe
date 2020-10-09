import { QueryStatus } from '../reducers/api';
import { createAction } from 'typesafe-actions';

export type ApiSetQueryStatusPayload = {
    name: string;
    status: QueryStatus;
};
export const setQueryStatus = createAction('API_SET_QUERY_STATUS')<ApiSetQueryStatusPayload>();
