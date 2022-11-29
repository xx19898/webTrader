import HighchartsReact from "highcharts-react-official"
import Highcharts from 'highcharts';
import { usePromiseTracker } from "react-promise-tracker";
import { Dataset } from "../../state/Stocks/stocksSlice"
import { processData } from "../../state/Stocks/stocksUtility/highchartDataParsing";
import Loader, { InfinitySpin } from 'react-loader-spinner'

interface IHighcharts{
    dataset: Dataset
}

const HighchartsComponent = ({dataset}:IHighcharts) => {
    const {ohlc,volume} = processData(dataset.data)

    var easeOutBounce = function (pos: number) {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
        }
        if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
        }
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
    };

    const options = {
        rangeSelector: {
            selected: 1,
        },
        title:{
            text: dataset.metadata["2. Symbol"]
        },
        yAxis: [
            {
                labels: {
                    align: "right",
                    x: -3,
                },
                title: {
                    text: "OHLC"
                },
                height:"60%",
                lineWidth: 2,
                resize: {
                    enabled: true,
                }, 
            },
            {
                labels: {
                    align: "right",
                    x: -3,
                },
                title: {
                    text: "Volume"
                },
                top: "65%",
                height: "35%",
                offset: 0,
                lineWidth: 2,
            }
        ],
        tooltip: {
            split: true,
        },
        series: [
            {
                type: "candlestick",
                name: dataset.metadata["2. Symbol"],
                data: ohlc,
                animation: {
                    duration: 1500,
                    // Uses simple function
                    easing: easeOutBounce
                }
            },
            {
                type: "column",
                name: "Volume",
                data: volume,
                animation: {
                    duration: 1500,
                    // Uses simple function
                    easing: easeOutBounce
                },
                yAxis: 1,
            }
        ]
    }

    return(
        <>
        <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options} 
        />
        </>
    )
}

export default HighchartsComponent

