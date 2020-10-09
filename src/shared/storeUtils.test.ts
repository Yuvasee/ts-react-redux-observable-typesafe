import { createAsyncAction } from 'typesafe-actions';
import { getQueryName, updatePrimitiveValue } from './storeUtils';

describe('storeUtils', () => {
    it('getQueryName', () => {
        const asyncAction = createAsyncAction('a/API_REQUEST', 'a/API_SUCCESS', 'a/API_FAILURE')<void, string, Error>();
        const queryName = getQueryName(asyncAction, { some: { random: 'data' } });
        expect(queryName).toEqual('["a/API",{"some":{"random":"data"}}]');
    });

    it('updatePrimitiveValue: correctly updates value', () => {
        const actionMock = { type: 'UPDATE_SOME', payload: 'new value' };
        const stateMock = { some: 'value' };
        const reducer = updatePrimitiveValue<typeof stateMock, keyof typeof stateMock>('some');
        expect(reducer(stateMock, actionMock)).toEqual({ some: 'new value' });
    });

    it('updatePrimitiveValue: do nothing if value has not changed', () => {
        const actionMock = { type: 'UPDATE_SOME', payload: 'value' };
        const stateMock = { some: 'value' };
        const reducer = updatePrimitiveValue<typeof stateMock, keyof typeof stateMock>('some');
        expect(reducer(stateMock, actionMock)).toMatchObject(stateMock);
    });
});
