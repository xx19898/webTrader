import { getStockData, getSymbols, IStockQueryParams, } from "./stocksActions";
import {put, call, SagaReturnType, CallEffect, PutEffect} from 'redux-saga/effects'
import * as stocksActionTypes from "./stocksActionTypes";
import { AnyAction } from "redux";
import { IStockSymbolList, StockDataApiResponse, stockDataApiResponse } from "./stocksZodSchemas";
import { RootState } from "../../store";
import { UPDATE_SYMBOL_LIST } from "./stocksSlice";


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
 Generator<CallEffect<IStockSymbolList> | PutEffect<{type:string,payload:IStockSymbolList}>, void,IStockSymbolList>
{
    const response: IStockSymbolList = yield call(getSymbols);
    console.log("downloaded!")
    console.log(response.length)
    yield put(UPDATE_SYMBOL_LIST(response))
}



