import { resolve } from "path"
import { z } from "zod"
import { StockDataApiResponse, stockDataApiResponse, stockDataForSingleSymbol, stockDataForSingleSymbolDataPart, stockDataForSingleSymbolDataPartDeeperObject } from "../../state/Stocks/stocksZodSchemas"
import { fromApiDataToDatasetFormat } from "../../state/Stocks/stockViewerChartDataUtility"
const ibm = {
    "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "IBM",
        "3. Last Refreshed": "2022-09-28",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2022-09-28": {
            "1. open": "121.6500",
            "2. high": "123.2300",
            "3. low": "119.8100",
            "4. close": "122.7600",
            "5. volume": "4996378"
        },
        "2022-09-27": {
            "1. open": "122.6000",
            "2. high": "123.9500",
            "3. low": "121.0800",
            "4. close": "121.7400",
            "5. volume": "4117215"
        },
    }
}

const a = {
    "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "A",
        "3. Last Refreshed": "2022-09-28",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2022-09-28": {
            "1. open": "122.7700",
            "2. high": "124.4300",
            "3. low": "121.6000",
            "4. close": "123.7200",
            "5. volume": "1361213"
        },
        "2022-09-27": {
            "1. open": "123.8700",
            "2. high": "124.0700",
            "3. low": "120.6000",
            "4. close": "121.6100",
            "5. volume": "1040450"
        },
    }
}
const testJson = {
    "IBM":{
        "Meta Data": {
            "1. Information": "Daily Prices (open, high, low, close) and Volumes",
            "2. Symbol": "IBM",
            "3. Last Refreshed": "2022-09-28",
            "4. Output Size": "Compact",
            "5. Time Zone": "US/Eastern"
        },
        "Time Series (Daily)": {
            "2022-09-28": {
                "1. open": "121.6500",
                "2. high": "123.2300",
                "3. low": "119.8100",
                "4. close": "122.7600",
                "5. volume": "4996378"
            },
            "2022-09-27": {
                "1. open": "122.6000",
                "2. high": "123.9500",
                "3. low": "121.0800",
                "4. close": "121.7400",
                "5. volume": "4117215"
            },
        }
    },
    "A": 
    {
        "Meta Data": {
            "1. Information": "Daily Prices (open, high, low, close) and Volumes",
            "2. Symbol": "A",
            "3. Last Refreshed": "2022-09-28",
            "4. Output Size": "Compact",
            "5. Time Zone": "US/Eastern"
        },
        "Time Series (Daily)": {
            "2022-09-28": {
                "1. open": "122.7700",
                "2. high": "124.4300",
                "3. low": "121.6000",
                "4. close": "123.7200",
                "5. volume": "1361213"
            },
            "2022-09-27": {
                "1. open": "123.8700",
                "2. high": "124.0700",
                "3. low": "120.6000",
                "4. close": "121.6100",
                "5. volume": "1040450",
            },
        }
    }
}


//++ :)
test('testing that parsing stock response with multiple symbols works correctly',() => {
    expect(new Promise(() => {
        stockDataForSingleSymbol.parse(a);
        stockDataForSingleSymbol.parse(ibm);
        const ss = stockDataApiResponse.parse(testJson);
    })).resolves.not.toThrowError();
})

//++ :)
test('testing that fromApiDataToDatasetFormat method works correctly',() => {
    expect(new Promise(() => {
        const testSubject = stockDataApiResponse.parse(testJson);
        const testDatasets = fromApiDataToDatasetFormat(testSubject,[]);
    })).resolves.not.toThrowError();
})