import { AgCharts } from 'ag-charts-react';

const Chart = ({ chartOptions }) => {
    return (
        <AgCharts 
        className='bg-purple-300'
        options={chartOptions} />
    )
}

export default Chart;