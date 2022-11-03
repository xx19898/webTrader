import { createDataset, Dataset } from "../../state/Stocks/stocksSlice";
import {concatListOfSymbols} from "../../state/Stocks/stocksUtility";
import { stockDataForSingleSymbol } from "../../state/Stocks/stocksZodSchemas";
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
})