import { combineReducers } from 'redux';
import { chartReducer } from './chart';
import { ChartItem } from '../models/ChartItem';
import { ApiError } from '../models/ApiError';

export interface ChartState {
    chart: ChartItem[];
    error: ApiError | Error | null;
    type: keyof ChartItem,
}

export interface RootState {
    chart: ChartState;
}

export const rootReducer = combineReducers<RootState>({
    chart: chartReducer as any,
});
