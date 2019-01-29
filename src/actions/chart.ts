import { createAction } from 'redux-actions';
import { ApiGetSymbolRequest } from '../models/ApiGetSymbolRequest';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import { ApiGetSymbolResponse } from '../models/ApiGetSymbolResponse';
import { environment } from '../environment';
import { ApiError } from '../models/ApiError';
import mock1Month from '../mocks/chart-1month.json';
import mock3Months from '../mocks/chart-3months.json';
import mock1Year from '../mocks/chart-1year.json';
import mockMax from '../mocks/chart-max.json';
import fetchMock from 'fetch-mock';

export enum Type {
    SET_SYMBOL_DATA = 'SET_SYMBOL_DATA',
    SET_SYMBOL_ERROR = 'SET_SYMBOL_ERROR',
}

export const fetchSymbol = function (
    payload: ApiGetSymbolRequest
): ThunkAction<void, RootState, void, AnyAction> {
    return (dispatch) => {
        return ApiGetSymbol(payload)
            .then((response) => {
                dispatch(setSymbolData(response));
            })
            .catch((error: Error | ApiError) => {
                dispatch(setSymbolError(error));
            });
    };
};

const ApiGetSymbol = (payload: ApiGetSymbolRequest, mock = true): Promise<ApiGetSymbolResponse> => {
    const url = environment.api.symbol + '?' + Object.keys(payload).map((key) => key + '=' + payload[key as keyof ApiGetSymbolRequest]).join('&');

    if (mock) {
        if (payload.period === 'month') {
            fetchMock.once(url, mock1Month);
        } else if (payload.period === '3months') {
            fetchMock.once(url, mock3Months);
        } else if (payload.period === 'year') {
            fetchMock.once(url, mock1Year);
        } else {
            fetchMock.once(url, mockMax);
        }
    }

    return fetch(url, {
        method: 'GET',
    }).then((response) => {
        return response.json()
            .then((responseData) => {
                if (response.status === 200) {
                    return responseData;
                }

                throw responseData;
            });
    });
};

export const setSymbolData = createAction<ApiGetSymbolResponse>(Type.SET_SYMBOL_DATA);
export const setSymbolError = createAction<Error | ApiError>(Type.SET_SYMBOL_ERROR);
