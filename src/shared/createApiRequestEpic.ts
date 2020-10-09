import { isActionOf, PayloadAction } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { from, of, merge } from 'rxjs';
import { filter, switchMap, mergeMap, concatMap, catchError } from 'rxjs/operators';

import { RootState } from 'src/store/reducers';
import { RootAction } from 'src/store/actions';
import { setQueryStatus } from 'src/store/actions/api';
import { AsyncActionCreator, getQueryName } from './storeUtils';

type ApiCallFunction<T1, T2> = (requestData: T1) => PromiseLike<T2>;

type MapOperators = 'switchMap' | 'mergeMap' | 'concatMap';
const getMapOperator = (option: MapOperators) => ({ switchMap, mergeMap, concatMap }[option]);

export type GenericEpic = Epic<RootAction, RootAction, RootState, void>;

/**
 * Makes epic for handling simple API requests. Fires on AsyncAction.request, then according to request result emits
 * success action with data in payload or failure action with error message. On every query status change fires action
 * to update it in the store.
 * @param asyncActionCreator function returning an object of 3 action creators: request, success, failure
 * recommended to use typesafe-actions createAsyncAction
 * @param apiCallFunction function taking parameter from request action payload and returning PromiseLike object
 * @param mapOperator rxjs operator for handling multiple simultaneous requests, defaults to switchMap
 */
export const createApiRequestEpic = <T1, T2>(
    asyncActionCreator: AsyncActionCreator<T1, T2>,
    apiCallFunction: ApiCallFunction<T1, T2>,
    mapOperator: MapOperators = 'switchMap',
): GenericEpic => (action$) =>
    action$.pipe(
        filter(isActionOf(asyncActionCreator.request)),

        (getMapOperator(mapOperator) as any)((action: PayloadAction<string, any>) => {
            const queryName = getQueryName(asyncActionCreator, action.payload);

            return merge(
                of(setQueryStatus({ name: queryName, status: 'request' })),

                from(apiCallFunction(action.payload)).pipe(
                    switchMap((responseData) =>
                        merge(
                            of(asyncActionCreator.success(responseData)),
                            of(setQueryStatus({ name: queryName, status: 'success' })),
                        ),
                    ),

                    catchError((message: string) => {
                        return merge(
                            of(asyncActionCreator.failure(new Error(message))),
                            of(setQueryStatus({ name: queryName, status: 'failure' })),
                        );
                    }),
                ),
            );
        }),
    );
