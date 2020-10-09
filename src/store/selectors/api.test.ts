import { selectQueryStatus } from './api';

jest.mock('src/shared/storeUtils', () => ({
    getQueryName: () => '[name,{data: 42}]',
}));

describe('api selectors: selectQueryStatus', () => {
    const getSelectorResult = (state: string) => {
        const stateMock = { api: { '[name,{data: 42}]': state } } as any;
        return selectQueryStatus(stateMock, { actionCreator: {} as any, requestParams: {} });
    };

    it('Correct return values for "request" status', () => {
        expect(getSelectorResult('request')).toEqual({
            status: 'request',
            isRequest: true,
            isSuccess: false,
            isFailure: false,
        });
    });

    it('Correct return values for "success" status', () => {
        expect(getSelectorResult('success')).toEqual({
            status: 'success',
            isRequest: false,
            isSuccess: true,
            isFailure: false,
        });
    });

    it('Correct return values for "failure" status', () => {
        expect(getSelectorResult('failure')).toEqual({
            status: 'failure',
            isRequest: false,
            isSuccess: false,
            isFailure: true,
        });
    });
});
