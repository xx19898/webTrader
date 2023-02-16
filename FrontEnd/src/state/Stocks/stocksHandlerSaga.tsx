import { getStockData, getSymbols, IStockQueryParams} from "./stocksActions";
import {put, call, SagaReturnType, CallEffect, PutEffect, SelectEffect, select} from 'redux-saga/effects'
import { IStockSymbolList, ITimeToWaitForApiRequestSlots, StockDataApiResponse, timeToWaitForApiRequestSlots } from "./stocksZodSchemas";
import { RENEW_API_REQUEST_SLOTS, UPDATE_CURRENT_STOCKS, UPDATE_SYMBOL_LIST } from "./stocksSlice";
import axios from "axios";
import { RootState } from '../../store';



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
        const response = yield call(getStockData, props.stockParams)
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

const accessTokenSelector = (state: RootState) => state.users.accessToken

export function* getSymbolsHandlerSaga():
 Generator<SelectEffect | CallEffect<IStockSymbolList> | PutEffect<{type:string,payload:IStockSymbolList}>,void,string & IStockSymbolList>
{
    const accessToken : string = yield select(accessTokenSelector) 
    const response: IStockSymbolList = yield call(getSymbols,accessToken)
    yield put(UPDATE_SYMBOL_LIST(response))
}



