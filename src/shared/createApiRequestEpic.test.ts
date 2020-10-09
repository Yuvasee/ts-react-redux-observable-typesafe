import { TestScheduler } from 'rxjs/testing';
import { createAsyncAction } from 'typesafe-actions';

import { createApiRequestEpic } from './createApiRequestEpic';
import { setQueryStatus } from 'src/store/actions/api';

jest.mock('./storeUtils', () => ({ getQueryName: () => 'query name' }));

describe('makeApiRequestEpic', () => {
    const asyncAction = createAsyncAction('a/API_REQUEST', 'a/API_SUCCESS', 'a/API_FAILURE')<void, string, Error>();

    const createTestScheduler = () =>
        new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });

    it('Epic emits proper apiSetQueryStatus on getting asyncAction.request', () => {
        const testScheduler = createTestScheduler();
        testScheduler.run(({ hot, expectObservable }) => {
            const action$ = hot('-a', { a: asyncAction.request() }) as any;
            const state$ = null as any;

            const mockApiCall = () => Promise.resolve('result');
            const apiRequestEpic = createApiRequestEpic(asyncAction, mockApiCall);

            const output$ = apiRequestEpic(action$, state$);

            expectObservable(output$).toBe('-a', {
                a: setQueryStatus({ name: 'query name', status: 'request' }),
            });
        });
    });

    it('Epic emits proper apiSetQueryStatus and asyncAction.success on api call success', () => {
        const testScheduler = createTestScheduler();
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: asyncAction.request() }) as any;
            const state$ = null as any;

            const mockApiCall = () => cold('--a', { a: 'result' }) as any;
            const apiRequestEpic = createApiRequestEpic(asyncAction, mockApiCall);

            const output$ = apiRequestEpic(action$, state$);

            expectObservable(output$).toBe('-a-(bc)', {
                a: setQueryStatus({ name: 'query name', status: 'request' }),
                b: asyncAction.success('result'),
                c: setQueryStatus({ name: 'query name', status: 'success' }),
            });
        });
    });

    it('Epic emits proper apiSetQueryStatus and asyncAction.failure on api call error', () => {
        const testScheduler = createTestScheduler();
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: asyncAction.request() }) as any;
            const state$ = null as any;

            const mockApiCall = () => cold('--#', {}, 'error') as any;
            const apiRequestEpic = createApiRequestEpic(asyncAction, mockApiCall);

            const output$ = apiRequestEpic(action$, state$);

            expectObservable(output$).toBe('-a-(bc)', {
                a: setQueryStatus({ name: 'query name', status: 'request' }),
                b: asyncAction.failure(new Error('error')),
                c: setQueryStatus({ name: 'query name', status: 'failure' }),
            });
        });
    });
});
