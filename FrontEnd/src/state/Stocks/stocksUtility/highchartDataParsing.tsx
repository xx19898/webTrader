import { Dataset } from "../stocksSlice"
import { CommonDataForSingleTimeUnit, SingleDataUnitBase, SingleDataUnitDailyAdjusted, singleDataUnitDailyIntradayWeeklyAndMonthly, SingleDataUnitDailyIntradayWeeklyAndMonthly, SingleDataUnitMonthlyAdjusted, SingleDataUnitWeeklyAdjusted, StockDataForSingleSymbolDataPart } from "../stocksZodSchemas"
import sortDataByDate from "./sortDataByDate"
import {parseDateTimeToUnixFormat} from "./timeParser"



const processData = (data: Record<string, CommonDataForSingleTimeUnit>) => {
        const ohlc: number [][] = [], volume: number[][] = []
        populateOhlcAndVolumeArrays(data, ohlc, volume)
        const sortedOhlc = sortDataByDate(ohlc,0,ohlc.length - 1)
        const sortedVolume = sortDataByDate(volume,0,volume.length - 1)
        return({
            ohlc:sortedOhlc as number[][],
            volume:sortedVolume as number[][],
        })
    }

function populateOhlcAndVolumeArrays(data: Record<string, CommonDataForSingleTimeUnit>, ohlc: number[][], volume: number[][]){
    Object.entries(data).forEach(([key, value]) => {
        console.log("Date: " + key)
        ohlc.push([parseDateTimeToUnixFormat(key), value["1. open"], value["2. high"], value["3. low"], value["4. close"]])
        let volumeValue;
        if('6. volume' in value){ 
            volumeValue = value['6. volume']
        }else if('5. volume' in value){
            volumeValue = value['5. volume']
        }else{
            throw new Error('None volume property found on alpha API data!')
        }
        console.log('new value for volumeValue is: ' + volumeValue)
        volume.push([parseDateTimeToUnixFormat(key), volumeValue])
    })
}

export  {processData}
