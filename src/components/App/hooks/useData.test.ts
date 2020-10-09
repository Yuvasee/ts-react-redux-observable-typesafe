import { renderHook } from '@testing-library/react-hooks';

import { dispatch, useSelector } from 'src/mocks/reactRedux';
import { useData } from './useData';
import { getData } from 'src/store/actions/app';
import { mockData } from 'src/mocks/mockData';

jest.mock('src/shared/hooks/useQueryStatus', () => ({ useQueryStatus: () => ({ isRequest: true }) }));

describe('useData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderWithMocks = (dataMock: any[] = []) => {
        useSelector.mockReturnValue(dataMock);
        return renderHook(() => useData());
    };

    it('Returns proper data from store', () => {
        const { result } = renderWithMocks(mockData.api.data);
        expect(result.current.data).toEqual(mockData.api.data);
    });

    it('Retured getDataOnce function dispatches proper action if data is empty', () => {
        const renderedHook = renderWithMocks();
        renderedHook.result.current.getDataOnce();
        renderedHook.rerender();
        expect(dispatch).toBeCalledWith(getData.request({ postId: 1 }));
    });

    it('Retured getDataOnce function does nothing if data is not empty', () => {
        const renderedHook = renderWithMocks(mockData.api.data);
        renderedHook.result.current.getDataOnce();
        renderedHook.rerender();
        expect(dispatch).not.toBeCalled();
    });

    it('Returns correct isRequest value', () => {
        const { result } = renderWithMocks(mockData.api.data);
        expect(result.current.isRequest).toEqual(true);
    });
});
