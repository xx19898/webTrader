import { getStockData, getSymbols, IStockQueryParameters} from "./stocksActions";
import {put, call, SagaReturnType, CallEffect, PutEffect, select, SelectEffect} from 'redux-saga/effects'
import * as stocksActionTypes from "./stocksActionTypes";
import { AnyAction } from "redux";
import { IStockSymbolList, StockDataApiResponse, stockDataApiResponse } from "./stocksZodSchemas";
import { fromApiDataToDatasetFormat } from "./stockViewerChartDataUtility";
import { RootState } from "../../store";
import { Dataset } from "./stocksSlice";
import { stat } from "fs";


type StocksServiceResponse = SagaReturnType<typeof getStockData>

type IStockDataHandler = {
    type: string,
    stockParams: IStockQueryParameters,
}
type IGetSymbols = {
    type: string,
}
const datasetsSelector = (state:RootState) => state.stocks.datasets 
export function* stockDataHandlerSaga(props: IStockDataHandler):
Generator<CallEffect<StockDataApiResponse> | PutEffect<AnyAction>,
                     void,
                     StocksServiceResponse>                                                                                                                                
{
    try{
    const response: StockDataApiResponse = yield call(getStockData, props.stockParams);
    //validate received data against the zod scheme
    const validatedResponse = stockDataApiResponse.parse(response); 
    //Updating the state
    put({type:stocksActionTypes.UPDATE_CURRENT_STOCKS, payload:validatedResponse})
    }
    catch(e){
        console.log((e as Error).message);
    }
}

export function* getSymbolsHandlerSaga():
 Generator<CallEffect<IStockSymbolList>, void,IStockSymbolList>
{
    const response: IStockSymbolList = yield call(getSymbols);
    put({type:stocksActionTypes.UPDATE_SYMBOL_LIST, payload: response})
}



