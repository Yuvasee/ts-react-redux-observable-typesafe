import MockAdapter from 'axios-mock-adapter';
import merge from 'lodash/merge';

import { Endpoint, HttpMethod } from 'src/shared/createEndpoint';
import { apiGetData } from 'src/api/endpoints';
import axiosInstance from '../api/axios';
import { mockData } from './mockData';

const mock = new MockAdapter(axiosInstance);

export function mockApi(overrides: any = {}) {
    mock.reset();

    const apiMockData = merge(mockData.api, overrides);
    const { data } = apiMockData;

    // Add endpoints to mock here
    mockEndpoint(apiGetData, data);
}

const methodMap: Record<HttpMethod, typeof mock.onGet> = {
    get: mock.onGet,
    post: mock.onPost,
};

function mockEndpoint<Res>(endpoint: Endpoint<any, Res>, responseData: Res): void {
    methodMap[endpoint.method].call(mock, endpoint.url).reply(200, responseData);
}
