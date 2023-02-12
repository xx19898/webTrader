import { takeEvery } from "redux-saga/effects";
import {LOGIN,REGISTER,UPDATE_STOCK_DEALS } from "./usersActionTypes";
import { loginHandlerSaga, registerHandlerSaga, updateStockDealsHandlerSaga } from "./usersHandlerSaga";

export function* usersWatcherSaga(){
    yield takeEvery(UPDATE_STOCK_DEALS,updateStockDealsHandlerSaga),
    yield takeEvery(LOGIN,loginHandlerSaga),
    yield takeEvery(REGISTER,registerHandlerSaga)
}