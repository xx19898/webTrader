import { getStockData, getSymbols, IStockFunction } from "./stocksActions";
import {put, call, SagaReturnType, CallEffect} from 'redux-saga/effects'
import { stockActionTypes } from "./stocksActionTypes";


type StocksServiceResponse = SagaReturnType<typeof getStockData>

type IStockHandler = {
    type: stockActionTypes,
    stockParams: IStockFunction
}
type IGetSymbols = {
    type: stockActionTypes,
}
type SymbolListResponse = SagaReturnType<typeof getSymbols>

export function* stockHandlerSaga(props: IStockHandler):
Generator<CallEffect<StocksServiceResponse>,
                     StocksServiceResponse,
                     StocksServiceResponse>                                                                                                                                
{
    const response: StocksServiceResponse = yield call(getStockData, props.stockParams);
}

export function* getSymbolsHandlerSaga():
 Generator<CallEffect<SymbolListResponse>,SymbolListResponse,SymbolListResponse>
{
    const response: SymbolListResponse = yield call(getSymbols);
}



