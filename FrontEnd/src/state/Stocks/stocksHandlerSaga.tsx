import { getStockData, getSymbols, IStockQueryParams, } from "./stocksActions";
import {put, call, SagaReturnType, CallEffect, PutEffect} from 'redux-saga/effects'
import * as stocksActionTypes from "./stocksActionTypes";
import { AnyAction } from "redux";
import { IStockSymbolList, StockDataApiResponse, stockDataApiResponse } from "./stocksZodSchemas";
import { RootState } from "../../store";


type StocksServiceResponse = SagaReturnType<typeof getStockData>


type IGetSymbols = {
    type: string,
}

interface IStockDataHandlerSaga{
    type: string,
    stockParams: IStockQueryParams
}

export function* stockDataHandlerSaga(props: IStockDataHandlerSaga):
Generator<CallEffect<StockDataApiResponse> | PutEffect<AnyAction>,
                     void,
                     StocksServiceResponse>                                                                                                                                
{
    try{
    const response: StockDataApiResponse = yield call(getStockData, props.stockParams);
    //Updating the state
    yield put({type:stocksActionTypes.UPDATE_CURRENT_STOCKS, payload:response})
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



