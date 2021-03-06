import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { ChartView } from '../../components/ChartView';
import * as ChartActions from '../../actions/chart';
import { omit } from '../../utils/omit';
import { ChartViewItem } from '../../components/ChartView/meta';
import { Radio } from 'antd';
import { Period } from '../../models/Period';
import Select from 'antd/lib/select';
import { ChartItem } from '../../models/ChartItem';
import './index.css';

export interface Props {
    actions?: Omit<typeof ChartActions, 'Type'>;
    data?: ChartViewItem[];
    title?: string;
    currency?: string;
    ISIN?: string;
    description?: string;
    currentPrice?: number | undefined;
}

@connect(
    (state: RootState): Omit<Props, 'actions'> => {
        const lastChartItem = state.chart.data.chart[state.chart.data.chart.length - 1];

        return {
            data: state.chart.data.chart.map((item) => {
                return {
                    date: item.date,
                    value: item[state.chart.type] as number,
                }
            }),
            title: state.chart.data.title,
            currency: state.chart.data.currency,
            ISIN: state.chart.data.ISIN,
            description: state.chart.data.description,
            currentPrice: (lastChartItem && lastChartItem.high),
        };
    },
    (dispatch: Dispatch): Pick<Props, 'actions'> => ({
        actions: bindActionCreators(omit(ChartActions, 'Type'), dispatch)
    })
)
export class Chart extends React.Component<Props> {
    private defaultPeriod: Period = 'month';
    private symbol: string = 'USDJH34G5JHGJH34';

    componentDidMount() {
        this.props.actions!.fetchSymbol({id: this.symbol, period: this.defaultPeriod})
    }

    render() {
        return <div className='content'>
            <div className='header'>
                <div className='memo'>
                    <h1>{this.props.title}
                        {this.props.currentPrice ? <>{' '}{this.props.currentPrice}{' '}<span className='currency'>{this.props.currency}</span></> : null}
                    </h1>
                    <div>
                        {this.props.ISIN}
                    </div>
                    <div>
                        {this.props.description}
                    </div>
                </div>
                <Radio.Group defaultValue={this.defaultPeriod} buttonStyle='solid' onChange={(event) => {
                    this.props.actions!.fetchSymbol({
                        id: this.symbol,
                        period: event.target.value,
                    })
                }}>
                    <Radio.Button value='month'>Month</Radio.Button>
                    <Radio.Button value='3months'>Quarter</Radio.Button>
                    <Radio.Button value='year'>Year</Radio.Button>
                    <Radio.Button value='max'>Max</Radio.Button>
                </Radio.Group>
            </div>
            <div>
                <ChartView data={this.props.data!}/>
            </div>
            <div className='footer'>
                <Select defaultValue='high' style={{width: 180}} onChange={(value) => {
                    this.props.actions!.setChartType(value as keyof ChartItem);
                }}>
                    <Select.Option value='high'>Price</Select.Option>
                    <Select.Option value='unadjustedVolume'>Unadjusted Volume</Select.Option>
                    <Select.Option value='change'>Change</Select.Option>
                </Select>
            </div>
        </div>;
    }
}
