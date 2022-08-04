import { getStockData, getSymbols, IStockQueryParameters} from "./stocksActions";
import {put, call, SagaReturnType, CallEffect, PutEffect} from 'redux-saga/effects'
import * as stocksActionTypes from "./stocksActionTypes";
import { AnyAction } from "redux";


type StocksServiceResponse = SagaReturnType<typeof getStockData>

type IStockDataHandler = {
    type: string,
    stockParams: IStockQueryParameters,
}
type IGetSymbols = {
    type: string,
}
type SymbolListResponse = SagaReturnType<typeof getSymbols>

export function* stockDataHandlerSaga(props: IStockDataHandler):
Generator<CallEffect<StocksServiceResponse> | PutEffect<AnyAction>,
                     void,
                     StocksServiceResponse>                                                                                                                                
{
    try{
    const response: StocksServiceResponse = yield call(getStockData, props.stockParams);
    //Updating the state
    put({type:stocksActionTypes.UPDATE_CURRENT_STOCKS, payload:response.data})
    }
    catch(e){
        console.log((e as Error).message);
    }
}

export function* getSymbolsHandlerSaga():
 Generator<CallEffect<SymbolListResponse>,SymbolListResponse,SymbolListResponse>
{
    const response: SymbolListResponse = yield call(getSymbols);
}



