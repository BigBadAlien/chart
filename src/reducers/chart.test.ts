import { chartReducer, initialState } from './chart';
import { setChartType, setSymbolData, setSymbolError } from '../actions/chart';
import mock1Month from '../mocks/chart-1month.json';
import { ApiGetSymbolResponse } from '../models/ApiGetSymbolResponse';

describe('Chart reducer', () => {
    it('setSymbolData should apply passed data', () => {
        const state = chartReducer(Object.assign(
            {}, initialState), setSymbolData(mock1Month as ApiGetSymbolResponse));
        expect(state).toMatchObject({
            chart: mock1Month,
        });
    });

    it('setSymbolError should apply error', () => {
        const errorResponse = {
            type: 'FOO_TYPE',
            message: 'Foo message',
            name: 'fooname',
        };

        const state = chartReducer(Object.assign(
            {}, initialState), setSymbolError(errorResponse));
        expect(state).toMatchObject({
            error: errorResponse,
        });
    });

    it('setChartType should apply passing type', () => {
        const type = 'unadjustedVolume';

        const state = chartReducer(Object.assign(
            {}, initialState), setChartType(type));
        expect(state).toMatchObject({
            type,
        });
    });
});