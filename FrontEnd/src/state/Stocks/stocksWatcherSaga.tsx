import { all, takeEvery } from "redux-saga/effects";
import { GET_INITIAL_STOCK,GET_STOCK_DATA,GET_SYMBOLS } from "./stocksActionTypes";
import { getSymbolsHandlerSaga, stockDataHandlerSaga } from "./stocksHandlerSaga";

export default function* stocksWatcherSaga(){
    yield all([
        takeEvery(GET_STOCK_DATA,stockDataHandlerSaga),
        takeEvery(GET_SYMBOLS,getSymbolsHandlerSaga)
    ])
}