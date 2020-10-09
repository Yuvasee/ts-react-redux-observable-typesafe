import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from 'src/store/actions/app';
import { selectData } from 'src/store/selectors/app';
import { useQueryStatus } from 'src/shared/hooks/useQueryStatus';

export function useData() {
    const dispatch = useDispatch();
    const data = useSelector(selectData);

    const getDataOnce = useCallback(() => {
        if (!data.length) {
            dispatch(getData.request({ postId: 1 }));
        }
    }, [data.length, dispatch]);

    const { isRequest } = useQueryStatus(getData, { postId: 1 });

    return { data, getDataOnce, isRequest };
}
