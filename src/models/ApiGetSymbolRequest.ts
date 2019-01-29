import { Period } from './Period';

export interface ApiGetSymbolRequest {
    id: string; // ISIN
    period: Period;
}
