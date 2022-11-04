import { resolve } from "path";
import { string, z } from "zod";
import {singleDataUnitDailyIntradayWeeklyAndMonthly, stockDataApiResponse, stockDataForSingleSymbol, stockDataForSingleSymbolDataPart} from "../../state/Stocks/stocksZodSchemas"
import testData from "../state/stocks/apiResponse";

const fullJson = {
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "IBM",
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
        "2022-09-23 17:15:00": {
            "1. open": "122.7100",
            "2. high": "122.7100",
            "3. low": "122.7100",
            "4. close": "122.7100",
            "5. volume": "1294"
        },
        "2022-09-23 16:45:00": {
            "1. open": "123.0000",
            "2. high": "123.0000",
            "3. low": "123.0000",
            "4. close": "123.0000",
            "5. volume": "500"
        },
    },
}

const innerJson = {
    "Time Series (5min)":{ 
    "2022-09-23 17:40:00": {
        "1. open": "122.7100",
        "2. high": "122.7100",
        "3. low": "122.7100",
        "4. close": "122.7100",
        "5. volume": "400"
    },
}
}
const mostInnerJson = {
    "2022-09-23 17:40:00":
    {
    "1. open": "122.7100",
    "2. high": "122.7100",
    "3. low": "122.7100",
    "4. close": "122.7100",
    "5. volume": "400"
    },
}
const madeType = z.preprocess( arg => Number(arg),z.number());
const x = z.object({"1. open": madeType,
"2. high": madeType,
"3. low": madeType,
"4. close": madeType,
"5. volume": madeType})





  const xs = {
    "a":{
        "name":"kirill",
        "address":"moscow"
    },
    "b":{
        "name":"ivan",
        "address":"rostov"
    }
  }

  const object = z.object({"name":z.string(),"address":z.string()});
  const schema = z.record(z.string(),object);
 
 //DONE!
 test('whole json stock data object is correct',() => {
     expect(new Promise(() =>stockDataForSingleSymbol.parse(fullJson))).resolves.not.toThrowError();
   })

  test('kk',() => {
    expect(new Promise(() => {
        schema.parse(xs)
    })).resolves.not.toThrowError()
  })

  test('whole json stock data object is correct',() => {
    expect(new Promise(() => stockDataApiResponse.parse(testData))).resolves.not.toThrowError()
  })


