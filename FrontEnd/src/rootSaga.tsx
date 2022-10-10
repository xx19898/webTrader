
import {fork, all } from "redux-saga/effects";
import { usersWatcherSaga } from "./state/Users/usersWatcherSaga";
import stocksWatcherSaga from "./state/Stocks/stocksWatcherSaga"; 

export function* rootWatcherSaga(){
    yield all ([
        usersWatcherSaga(),
        stocksWatcherSaga()
    ]);
}