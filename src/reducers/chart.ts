import { handleActions } from 'redux-actions';
import { ChartState } from './index';

export const initialState: ChartState = {
};


export const chartReducer = handleActions<ChartState, any>(
    {

    },
    initialState
);
