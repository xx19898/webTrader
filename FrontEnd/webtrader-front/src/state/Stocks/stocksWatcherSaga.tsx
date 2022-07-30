import { takeEvery } from "redux-saga/effects";
import { stockActionTypes } from "./stocksActionTypes";
import { getSymbolsHandlerSaga, stockHandlerSaga } from "./stocksHandlerSaga";

export function* stocksWatcherSaga(){
    yield takeEvery(stockActionTypes.GET_INITIAL_STOCK,stockHandlerSaga);
    yield takeEvery(stockActionTypes.GET_SYMBOLS,getSymbolsHandlerSaga);
}