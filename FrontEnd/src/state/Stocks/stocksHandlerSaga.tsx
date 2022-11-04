import { getStockData, getSymbols, IStockQueryParams, } from "./stocksActions";
import {put, call, SagaReturnType, CallEffect, PutEffect} from 'redux-saga/effects'
import * as stocksActionTypes from "./stocksActionTypes";
import { AnyAction } from "redux";
import { IStockSymbolList, StockDataApiResponse, stockDataApiResponse } from "./stocksZodSchemas";
import { RootState } from "../../store";
import { UPDATE_CURRENT_STOCKS, UPDATE_SYMBOL_LIST } from "./stocksSlice";


type StocksServiceResponse = SagaReturnType<typeof getStockData>


type IGetSymbols = {
    type: string,
}

interface IStockDataHandlerSaga{
    type: string,
    stockParams: IStockQueryParams
}

export function* stockDataHandlerSaga(props: IStockDataHandlerSaga):
Generator<CallEffect<StockDataApiResponse> | PutEffect<{type:string,payload:StockDataApiResponse}>,
                     void,
                     StockDataApiResponse>                                                                                                                           
{
    try{
        console.log(props.stockParams)
    const response = yield call(getStockData, props.stockParams);
    //Updating the state
    yield put(UPDATE_CURRENT_STOCKS(response))
    }
    catch(e){
        console.log((e as Error).message)
    }
}

export function* getSymbolsHandlerSaga():
 Generator<CallEffect<IStockSymbolList> | PutEffect<{type:string,payload:IStockSymbolList}>, void,IStockSymbolList>
{
    const response: IStockSymbolList = yield call(getSymbols);
    yield put(UPDATE_SYMBOL_LIST(response))
}



