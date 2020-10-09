import { createApiRequestEpic } from 'src/shared/createApiRequestEpic';
import * as actions from '../actions/app';
import * as endpoints from 'src/api/endpoints';

export const getDataEpic = createApiRequestEpic(actions.getData, endpoints.apiGetData.call);
