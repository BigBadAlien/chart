import { combineReducers } from 'redux';
import { chartReducer } from './chart';

export interface ChartState {
}

export interface RootState {
    chart: ChartState;
}

export const rootReducer = combineReducers<RootState>({
    chart: chartReducer as any,
});
