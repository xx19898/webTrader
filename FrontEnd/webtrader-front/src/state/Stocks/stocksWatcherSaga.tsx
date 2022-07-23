import { takeEvery } from "redux-saga/effects";
import { GET_INITIAL_STOCK } from "./stocksActionTypes";
import { stockHandlerSaga } from "./stocksHandlerSaga";

export function* stocksWatcherSaga(){
    yield takeEvery(GET_INITIAL_STOCK,stockHandlerSaga);
    
}