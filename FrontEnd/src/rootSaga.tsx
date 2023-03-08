
import {fork, all } from "redux-saga/effects";
import { usersWatcherSaga } from "./state/Users/usersWatcherSaga";
import stocksWatcherSaga from "./state/Stocks/stocksWatcherSaga"; 
import { messagingWatcherSaga } from "./state/messaging/messagingWatcherSaga";

export function* rootWatcherSaga(){
    //TODO: test the parsing function, set up creating the admin user and user user in database on backend
    yield all ([
        usersWatcherSaga(),
        stocksWatcherSaga(),
        messagingWatcherSaga(),
    ]);
}