import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock";
import { Dataset } from "../../state/Stocks/stocksSlice"
import { processData } from "../../state/Stocks/stocksUtility/highchartDataParsing";

interface IHighcharts{
    dataset: Dataset
}

const HighchartsComponent = ({dataset}:IHighcharts) => {
    const {ohlc,volume} = processData(dataset.data)

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
                data: ohlc
            },
            {
                type: "column",
                name: "Volume",
                data: volume,
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

