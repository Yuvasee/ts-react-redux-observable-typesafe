import { useDispatch, useSelector as useSelectorMocked } from 'react-redux';

jest.mock('react-redux');

export const dispatch = jest.fn();
(useDispatch as jest.Mock).mockReturnValue(dispatch);

export const useSelector = useSelectorMocked as jest.Mock;
