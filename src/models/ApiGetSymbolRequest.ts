
export interface ApiGetSymbolRequest {
    id: string; // ISIN
    period: 'month' | '3months' | 'year' | 'max';
}
