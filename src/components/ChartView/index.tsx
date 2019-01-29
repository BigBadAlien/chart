import * as React from 'react';
import { FunctionComponent } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ChartViewItem } from './meta';

interface Props {
    data: ChartViewItem[];
}

export const ChartView: FunctionComponent<Props> = (props) => {
    return           <LineChart
        width={600} height={400} data={props.data}
        margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
    >
        <CartesianGrid  />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Line dataKey="value" stroke="#d5d5d5" strokeWidth={2} points={[{ x: 50, y: 50, value: 50 }]} />
    </LineChart>;
};
