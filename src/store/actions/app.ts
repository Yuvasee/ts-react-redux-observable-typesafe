import { createAsyncAction } from 'typesafe-actions';

import { GetDataReq, GetDataRes } from '../../api/endpoints';

// prettier-ignore
export const getData = createAsyncAction(
    'app/GET_DATA_REQUEST',
    'app/GET_DATA_SUCCESS',
    'app/GET_DATA_FAILURE',
)<GetDataReq, GetDataRes, Error>();
