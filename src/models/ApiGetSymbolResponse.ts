import { ChartItem } from './ChartItem';

export interface ApiGetSymbolResponse {
    title: string;
    currency: 'USD' | '';
    ISIN: string;
    description: string;
    chart: ChartItem[];
}
