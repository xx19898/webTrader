import { getStockData, getSymbols, IStockQueryParams} from "./stocksActions";
import {put, call, SagaReturnType, CallEffect, PutEffect} from 'redux-saga/effects'
import { IStockSymbolList, ITimeToWaitForApiRequestSlots, StockDataApiResponse, timeToWaitForApiRequestSlots } from "./stocksZodSchemas";
import { RENEW_API_REQUEST_SLOTS, UPDATE_CURRENT_STOCKS, UPDATE_SYMBOL_LIST } from "./stocksSlice";
import axios from "axios";



type StocksServiceResponse = SagaReturnType<typeof getStockData>


type IGetSymbols = {
    type: string,
}

interface IStockDataHandlerSaga{
    type: string,
    stockParams: IStockQueryParams
}

export function* stockDataHandlerSaga(props: IStockDataHandlerSaga):
Generator<CallEffect<StockDataApiResponse> |  PutEffect<{type:string,payload:StockDataApiResponse} | {type:string,payload:ITimeToWaitForApiRequestSlots}>,
                     void,
                     StockDataApiResponse>                                                                                                                           
{
    try{
        console.log(props.stockParams)
    const response = yield call(getStockData, props.stockParams);
    console.log("printing backend data response")
    console.log(response)
    //Updating the state
    yield put(UPDATE_CURRENT_STOCKS(response))
    }
    catch(err: any){
        console.log((err as Error).message)
        if(axios.isAxiosError(err) && err.response){
            if(err.response.status == 408){
                const timeToWaitInSeconds = timeToWaitForApiRequestSlots.parse(err.response.data)
                yield put(RENEW_API_REQUEST_SLOTS(timeToWaitInSeconds))
            }
        }
    }
}

export function* getSymbolsHandlerSaga():
 Generator<CallEffect<IStockSymbolList> | PutEffect<{type:string,payload:IStockSymbolList}>, void,IStockSymbolList>
{
    const response: IStockSymbolList = yield call(getSymbols);
    yield put(UPDATE_SYMBOL_LIST(response))
}



