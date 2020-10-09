import { getType, PayloadAction, PayloadActionCreator } from 'typesafe-actions';

export type AsyncActionCreator<T1 = any, T2 = any> = {
    request: PayloadActionCreator<any, T1>;
    success: PayloadActionCreator<any, T2>;
    failure: PayloadActionCreator<any, Error>;
};

export const reApiAction = /(.+)_(REQUEST|SUCCESS|FAILURE)$/;

/**
 * Gets query name base on asyncAction creator and request data (basen on it's stringified value)
 * @param asyncAction Async action creator, created by 'typesafe-actions' createAsyncAction function
 * @param requestData Any serializable object, which defines unique query
 */
export const getQueryName = (asyncAction: AsyncActionCreator, requestData: any) => {
    const actionType = getType(asyncAction.request);
    const actionName = actionType.match(reApiAction)[1];
    return JSON.stringify([actionName, requestData]);
};

/**
 * Returns reducer function, which compares current value and action.payload, updates if value has changed.
 * Can (and should) be used with 'typesafe-actions' createReducer function without explicit type casting.
 * @param propertyName state property to update
 */
export const updatePrimitiveValue = <T extends object, K extends keyof T>(propertyName: K) => (
    state: T,
    action: PayloadAction<string, T[K]>,
) =>
    state[propertyName] === action.payload
        ? state
        : {
              ...state,
              [propertyName]: action.payload,
          };
