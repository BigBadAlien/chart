import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { ChartView } from '../../components/ChartView';
import * as ChartActions from '../../actions/chart';
import { omit } from '../../utils/omit';


export interface Props {
    actions?: Omit<typeof ChartActions, 'Type'>;
}

@connect(
    (_state: RootState): Partial<Props> => { // Pick<Props>
        return {
        };
    },
    (dispatch: Dispatch): Pick<Props, 'actions'> => ({
        actions: bindActionCreators(omit(ChartActions, 'Type'), dispatch)
    })
)
export class Chart extends React.Component<Props> {
    render() {
        return <ChartView/>;
    }
}
