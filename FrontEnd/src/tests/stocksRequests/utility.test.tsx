import { renewApiRequestSlots } from "../../state/Stocks/stocksActions";
import { createDataset, Dataset } from "../../state/Stocks/stocksSlice";
import {concatListOfSymbols} from "../../state/Stocks/stocksUtility";
import { processData } from "../../state/Stocks/stocksUtility/highchartDataParsing";
import sortDataByDate from "../../state/Stocks/stocksUtility/sortDataByDate";
import {parseDateTimeToUnixFormat} from "../../state/Stocks/stocksUtility/timeParser";
import { SingleDataUnitDailyIntradayWeeklyAndMonthly, stockDataForSingleSymbol } from "../../state/Stocks/stocksZodSchemas";
import { deleteOlderVersionsOfStockData } from "../../state/Stocks/stockViewerChartDataUtility";

const array = ["IBM","APPLE","GP"];

test('concatanating list of strings works properly',() => {
    expect(concatListOfSymbols(array)).toBe("IBM,APPLE,GP");
});

const AJson = {
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "A",
        "3. Last Refreshed": "2022-09-23 17:40:00",
        "4. Interval": "5min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
        "2022-09-23 17:40:00": {
            "1. open": "122.7100",
            "2. high": "122.7100",
            "3. low": "122.7100",
            "4. close": "122.7100",
            "5. volume": "400"
        },
    },
}

const BJson = {
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "B",
        "3. Last Refreshed": "2022-09-23 17:40:00",
        "4. Interval": "5min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
        "2022-09-23 17:40:00": {
            "1. open": "122.7100",
            "2. high": "122.7100",
            "3. low": "122.7100",
            "4. close": "122.7100",
            "5. volume": "400"
        },
    },
}

const CJson = {
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "C",
        "3. Last Refreshed": "2022-09-23 17:40:00",
        "4. Interval": "5min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
        "2022-09-23 17:40:00": {
            "1. open": "122.7100",
            "2. high": "122.7100",
            "3. low": "122.7100",
            "4. close": "122.7100",
            "5. volume": "400"
        },
    },
}
const AJsonParsed = stockDataForSingleSymbol.parse(AJson);
const BJsonParsed = stockDataForSingleSymbol.parse(BJson);
const CJsonParsed = stockDataForSingleSymbol.parse(CJson);
const datasetA = createDataset({metadata:AJsonParsed["Meta Data"],data:AJsonParsed["Time Series (5min)"],borderColor:"red"})
const datasetB = createDataset({metadata:BJsonParsed["Meta Data"],data:BJsonParsed["Time Series (5min)"],borderColor:"red"})
const datasetC = createDataset({metadata:CJsonParsed["Meta Data"],data:CJsonParsed["Time Series (5min)"],borderColor:"red"})
const oldDatasets:Dataset[] = [datasetA,datasetB,datasetC]
const newDatasets:Dataset[] = [datasetA];

describe('testing utilities for stock functionality', () => {
    test('it should delete all new datasets',() => {
    const resultDataset = deleteOlderVersionsOfStockData({newDatasets:newDatasets,oldDatasets:oldDatasets})
    expect(resultDataset).toMatchObject([datasetB,datasetC])
})

test('it should concatenate two symbols into one',() => {
    const symbolA = "A",symbolB = "B"
    const resultSymbol = concatListOfSymbols([symbolA,symbolB])
    console.log(resultSymbol)
    expect(resultSymbol).toBe("A,B")
})
test('merge sort should work properly',() => {
    const testArr = [['2022-12-23',0,0,0,0],['2022-11-20',0,0,0,0],['2022-10-09',0,0,0,0]] 
    console.log("'**********")
    const sortedTestArr = sortDataByDate(testArr,0,2)
    console.log(sortedTestArr)
    expect(sortedTestArr).toStrictEqual([['2022-10-09',0,0,0,0],['2022-11-20',0,0,0,0],['2022-12-23',0,0,0,0]])
})

test('time parser should work properly',() => {
    const timeAsString = "2020-12-22"
    const convertedToUnix = parseDateTimeToUnixFormat(timeAsString)
    console.log(convertedToUnix)
    expect(convertedToUnix).toBe(1608588000000)
})
test('populate the array method should work properly',() => {
    const testObject: SingleDataUnitDailyIntradayWeeklyAndMonthly = {
        "1. open": 2.5,
        "2. high": 7,
        "3. low": 3,
        "4. close":4,
        "5. volume":100,
    }

    const x = processData({"2022-12-22":testObject})
    expect(x.ohlc[0][1]).toBe(2.5)
})

 test('convertion of array of cooldown times in seconds to an array of expiration dates for api request slots functions properly', () => {
    const waitTimeArray = [21,3]
    const currTime_1 = new Date()
    currTime_1.setSeconds(currTime_1.getSeconds() + 21)
    const currTime_2 = new Date()
    currTime_2.setSeconds(currTime_2.getSeconds() + 3)
    const shouldBe = [currTime_1,currTime_2]
    const resultArr = renewApiRequestSlots({timeToWaitInSeconds: waitTimeArray})
    expect(resultArr[0].toDateString()).toBe(shouldBe[0].toDateString())
    expect(resultArr[1].toDateString()).toBe(shouldBe[1].toDateString())
    console.log("GOT TO FINISH")
})




})