import { getStockData, IStockFunction } from "./stocksActions";
import {put, call, SagaReturnType, CallEffect} from 'redux-saga/effects'

//Deriving the return type for
type StocksServiceResponse = SagaReturnType<typeof getStockData>

type IStockHandler = {
    type: String,
    stockParams: IStockFunction
}

export function* stockHandlerSaga(props: IStockHandler):
Generator<CallEffect<StocksServiceResponse>,
                     StocksServiceResponse,
                     StocksServiceResponse>                                                                                                                                
{
    const response: StocksServiceResponse = yield call(getStockData, props.stockParams);
}



