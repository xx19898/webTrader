import { Dataset } from "../stocksSlice"
import { SingleDataUnitDailyIntradayWeeklyAndMonthly, StockDataForSingleSymbolDataPart } from "../stocksZodSchemas"
import timeParser from "./timeParser"


const processDataForHighCharts = ({dataset}:{dataset:Dataset}) => {
    switch( dataset.metadata["1. Information"]){
        case "Intraday (5min) open, high, low, close prices and volume":
            return processIntradayData(dataset.data as Record<string,SingleDataUnitDailyIntradayWeeklyAndMonthly>)
        default:
            console.log("right here " + dataset.metadata["1. Information"])
            throw Error("No appropriate handlers found")
    }

    //TODO: IMPLEMENT VISUALISING DATA WITH HIGHCHARTS

}

const processIntradayData = (data:Record<string,SingleDataUnitDailyIntradayWeeklyAndMonthly>) => {
    const ohlc: number[][] = [], volume: number[][] = []
    Object.entries(data).forEach(([key,value]) => {
        ohlc.push([timeParser(key),value["1. open"],value["2. high"],value["3. low"],value["4. close"]])
        volume.push([timeParser(key),value["5. volume"]])
    })
    return({
        ohlc:ohlc,
        volume:volume,
    })
}

const processDailyData = () => {
    
}


const processDailyAdjustedData = () => {
    
}

const processWeeklyData = () => {
    
}

const processWeeklyAdjustedData = () => {
    
}

const processMonthlyData = () => {
    
}

const processMonthlyAdjustedData = () => {
    
}


export {processDataForHighCharts};