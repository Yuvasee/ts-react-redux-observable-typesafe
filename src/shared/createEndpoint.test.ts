import axios from 'src/api/axios';
import { createEndpoint } from './createEndpoint';

jest.mock('src/api/axios', () => ({
    get: jest.fn(() => ({ data: '' })),
    post: jest.fn(() => ({ data: '' })),
}));

describe('endpointFactory', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('"Get" endpoint call envokes proper axios method', () => {
        const getEndponit = createEndpoint('get', 'https://url.com');
        expect(getEndponit.url).toEqual('https://url.com');
        expect(getEndponit.method).toEqual('get');

        getEndponit.call({ fake: 'random', request: 'data' });
        expect(axios.get).toBeCalledWith('https://url.com', { params: { fake: 'random', request: 'data' } });
    });

    it('"Post" endpoint call envokes proper axios method', () => {
        const getEndponit = createEndpoint('post', 'https://url.com');
        expect(getEndponit.url).toEqual('https://url.com');
        expect(getEndponit.method).toEqual('post');

        getEndponit.call({ fake: 'random', request: 'data' });
        expect(axios.post).toBeCalledWith('https://url.com', { fake: 'random', request: 'data' });
    });
});
