//TODO: test that fetching stock data from backend api and populating the state
//TODO: works correctly
import { IStockState, stockSlice } from "../../../state/Stocks/stocksSlice"
import stocksWatcherSaga from "../../../state/Stocks/stocksWatcherSaga"
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { GET_STOCK_DATA, GET_SYMBOLS, UPDATE_CURRENT_STOCKS } from "../../../state/Stocks/stocksActionTypes";
import { getStockData } from "../../../state/Stocks/stocksActions";
import { call } from "redux-saga/effects";
import { stockDataHandlerSaga } from "../../../state/Stocks/stocksHandlerSaga";
import { assert } from "console";
import { stockFunctionTypes } from "../../../state/Stocks/stocksRequestTypes";
import { combineReducers } from "@reduxjs/toolkit";


const expectedFinalState:IStockState = {
    datasets:[
        {
            metadata:{
                "5. Time Zone": "US\/Eastern",
                "2. Symbol": "AA",
                "4. Output Size": "Compact",
                "1. Information": "Daily Prices (open, high, low, close) and Volumes",
                "3. Last Refreshed": "2022-10-04"
            },
            data:{
                "2022-06-08":{
                "3. low": 62.1200,
                "5. volume": 4453330,
                "1. open": 64.5300,
                "2. high": 65.8989,
                "4. close": 62.2800
            },
                "2022-06-09":{
                "3. low": 55.5600,
                "5. volume": 10345893,
                "1. open": 61.4600,
                "2. high": 61.7000,
                "4. close": 55.5600
            },
        },
            tension: 1,
            borderColor: "red",
        },
        {
            metadata:{
                "5. Time Zone": "US\/Eastern",
                "2. Symbol": "IBM",
                "4. Output Size": "Compact",
                "1. Information": "Daily Prices (open, high, low, close) and Volumes",
                "3. Last Refreshed": "2022-10-04"
                },
            borderColor: "red",
            tension:1,
            data:{
                "2022-06-08": {
                    "3. low": 140.1500,
                    "5. volume": 3005666,
                    "1. open": 142.0700,
                    "2. high": 142.8000,
                    "4. close": 140.8300
                },
                "2022-06-09": {
                    "3. low": 137.9300,
                    "5. volume": 3592551,
                    "1. open": 140.1500,
                    "2. high": 141.0400,
                    "4. close": 137.9600
                },
    
            }
        }
    ],
}
const mockedApiResponse = {
    "IBM": {
		"Time Series (Daily)": {
			"2022-06-08": {
				"3. low": 140.1500,
				"5. volume": 3005666,
				"1. open": 142.0700,
				"2. high": 142.8000,
				"4. close": 140.8300
			},
			"2022-06-09": {
				"3. low": 137.9300,
				"5. volume": 3592551,
				"1. open": 140.1500,
				"2. high": 141.0400,
            },
            "Meta Data": {
                "5. Time Zone": "US\/Eastern",
                "2. Symbol": "IBM",
                "4. Output Size": "Compact",
                "1. Information": "Daily Prices (open, high, low, close) and Volumes",
                "3. Last Refreshed": "2022-10-04"
            },
        },
    },
        
            "AA": {
                "Time Series (Daily)": {
                    "2022-06-08": {
                        "3. low": 62.1200,
                        "5. volume": 4453330,
                        "1. open": 64.5300,
                        "2. high": 65.8989,
                        "4. close": 62.2800
                    },
                    "2022-06-09": {
                        "3. low": 55.5600,
                        "5. volume": 10345893,
                        "1. open": 61.4600,
                        "2. high": 61.7000,
                        "4. close": 55.5600
                    },
                    "2022-06-10": {
                        "3. low": 52.5700,
                        "5. volume": 9354669,
                        "1. open": 54.0400,
                        "2. high": 54.7500,
                        "4. close": 53.0100
                    },
                },
                    "Meta Data": {
                        "5. Time Zone": "US\/Eastern",
                        "2. Symbol": "AA",
                        "4. Output Size": "Compact",
                        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
                        "3. Last Refreshed": "2022-10-04"
                    }
        }
    }
    
    describe('fetching data from backend api',() => {
        test('fetchStockData method works properly', async () => {
            const backEndResponse = await getStockData({function:stockFunctionTypes.DAILY,symbols:["AA"]})
            
            
        })

        test('stocksHandlerSaga should put same result as the fetchStockData method',async () => {
            const props = {stockParams:{function:stockFunctionTypes.DAILY,symbols:["AA"]},type:GET_STOCK_DATA}
            const backEndResponse = await getStockData(props.stockParams)

            return expectSaga(stockDataHandlerSaga,props)
            .provide([[call(getStockData,props.stockParams),backEndResponse]])
            .put({type:UPDATE_CURRENT_STOCKS,payload:backEndResponse})
            .run()
        })
//This wont pass, but ignore it for now since it can depend on  me not understanding redux test plan properly
        test('stockswatchersaga should fetch the requested data from the api, process it and save it in the store',() => {
            const props = {stockParams:{function:stockFunctionTypes.DAILY, symbols:["AA","IBM"]},type:GET_STOCK_DATA}
            const _initialState = () => ({datasets:[]});
            return expectSaga(stockDataHandlerSaga,props)
            .withReducer(
                combineReducers({
                    stocks:stockSlice.reducer}),
                    {stocks: _initialState()})
            .provide([[call(getStockData,props.stockParams),mockedApiResponse]])
            .put({type:UPDATE_CURRENT_STOCKS,payload:mockedApiResponse})
            .hasFinalState(expectedFinalState)

            .run()  
        })
    })






