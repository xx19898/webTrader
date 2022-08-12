import { takeEvery } from "redux-saga/effects";
import { GET_INITIAL_STOCK,GET_SYMBOLS } from "./stocksActionTypes";
import { getSymbolsHandlerSaga, stockDataHandlerSaga } from "./stocksHandlerSaga";

export function* stocksWatcherSaga(){
    yield takeEvery(GET_INITIAL_STOCK,stockDataHandlerSaga);
    yield takeEvery(GET_SYMBOLS,getSymbolsHandlerSaga);
}