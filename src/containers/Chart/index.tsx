import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { ChartView } from '../../components/ChartView';
import * as ChartActions from '../../actions/chart';
import { omit } from '../../utils/omit';
import { ChartViewItem } from '../../components/ChartView/meta';


export interface Props {
    actions?: Omit<typeof ChartActions, 'Type'>;
    data?: ChartViewItem[];
}

@connect(
    (state: RootState): Pick<Props, 'data'> => { // Pick<Props>
        return {
            data: state.chart.data.chart.map((item) => {
                return {
                    date: item.date,
                    value: item[state.chart.type] as number,
                }
            })
        };
    },
    (dispatch: Dispatch): Pick<Props, 'actions'> => ({
        actions: bindActionCreators(omit(ChartActions, 'Type'), dispatch)
    })
)
export class Chart extends React.Component<Props> {
    componentDidMount() {
        this.props.actions!.fetchSymbol({id: 'USDJH34G5JHGJH34', period: 'month'})
    }

    render() {
        return <ChartView data={this.props.data!}/>;
    }
}
