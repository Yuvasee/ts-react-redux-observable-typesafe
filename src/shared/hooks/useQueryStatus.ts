import { useSelector } from 'react-redux';

import { RootState } from 'src/store/reducers';
import { selectQueryStatus } from 'src/store/selectors/api';
import { AsyncActionCreator } from '../storeUtils';

export function useQueryStatus(actionCreator: AsyncActionCreator, requestParams: any) {
    return useSelector<RootState, ReturnType<typeof selectQueryStatus>>((state) =>
        selectQueryStatus(state, { actionCreator, requestParams }),
    );
}
