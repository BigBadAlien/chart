import { Action, handleActions } from 'redux-actions';
import { ChartState } from './index';
import { Type } from '../actions/chart';
import { ApiGetSymbolResponse } from '../models/ApiGetSymbolResponse';
import { ApiError } from '../models/ApiError';
import { ChartItem } from '../models/ChartItem';

export const initialState: ChartState = {
    data: {
        title: '',
        currency: '',
        ISIN: '',
        description: '',
        chart: [],
    },
    error: null,
    type: 'high',
};


export const chartReducer = handleActions<ChartState, any>(
    {
        [Type.SET_SYMBOL_DATA]: (state, action: Action<ApiGetSymbolResponse>) => {
            return Object.assign({}, state, {
                data: action.payload,
            });
        },
        [Type.SET_SYMBOL_ERROR]: (state, action: Action<ApiError | Error>) => {
            return Object.assign({}, state, {
                error: action.payload,
            });
        },
        [Type.SET_CHART_TYPE]: (state, action: Action<keyof ChartItem>) => {
            return Object.assign({}, state, {
                type: action.payload,
            });
        },
    },
    initialState
);
