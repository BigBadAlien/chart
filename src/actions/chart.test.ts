import configureMockStore from 'redux-mock-store'
import thunk, { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import { fetchSymbol } from './chart';
import * as mock1Month from '../mocks/chart-1month.json';
import mock3Months from '../mocks/chart-3months.json';
import mock1Year from '../mocks/chart-1year.json';
import mockMax from '../mocks/chart-max.json';
import fetchMock from 'fetch-mock';


const middlewares = [thunk];
const mockStore = configureMockStore<RootState, ThunkAction<void, RootState, void, AnyAction>>(middlewares);

describe('Chart actions', () => {
    beforeEach(() => {
        fetchMock.reset();
    });

    it('Fetch action should fetch according to period', () => {
        const store = mockStore();

        Promise.all([
            store.dispatch<any>(fetchSymbol({id: 'USD876876HJGYTUYTUY', period: 'month'})),
            store.dispatch<any>(fetchSymbol({id: 'USD876876HJGYTUYTUY', period: '3months'})),
            store.dispatch<any>(fetchSymbol({id: 'USD876876HJGYTUYTUY', period: 'year'})),
            store.dispatch<any>(fetchSymbol({id: 'USD876876HJGYTUYTUY', period: 'max'})),
        ]).then(() => {
            expect(store.getActions()).toEqual([
                {
                    type: 'SET_SYMBOL_DATA',
                    payload:
                        {
                            title: 'NII CAPITAL',
                            currency: 'USD',
                            ISIN: 'US5675HGFHTGUYB6',
                            description: 'NII CAPITAL CORP, Telecomunication',
                            chart: mock1Month.chart
                        }
                },
                {
                    type: 'SET_SYMBOL_DATA',
                    payload:
                        {
                            title: 'NII CAPITAL',
                            currency: 'USD',
                            ISIN: 'US5675HGFHTGUYB6',
                            description: 'NII CAPITAL CORP, Telecomunication',
                            chart: mock3Months.chart
                        }
                },
                {
                    type: 'SET_SYMBOL_DATA',
                    payload:
                        {
                            title: 'NII CAPITAL',
                            currency: 'USD',
                            ISIN: 'US5675HGFHTGUYB6',
                            description: 'NII CAPITAL CORP, Telecomunication',
                            chart: mock1Year.chart
                        }
                },
                {
                    type: 'SET_SYMBOL_DATA',
                    payload:
                        {
                            title: 'NII CAPITAL',
                            currency: 'USD',
                            ISIN: 'US5675HGFHTGUYB6',
                            description: 'NII CAPITAL CORP, Telecomunication',
                            chart: mockMax.chart
                        }
                }])
        });
    });

    it('Fetch error should emit error action', async () => {
        const store = mockStore();
        fetchMock.get('*', {status: 500});
        store.dispatch<any>(fetchSymbol({id: 'USD876876HJGYTUYTUY', period: 'month'}))
            .then(() => {
                const action = store.getActions()[0];
                expect(action).toMatchObject({ type: 'SET_SYMBOL_ERROR' });
                expect(action.payload.type).toBeDefined();
                expect(action.payload.message).toBeDefined();
            });
    });
});
