import { takeEvery } from "redux-saga/effects";
import {LOGIN,LOGOUT,REGISTER} from "./usersActionTypes";
import { loginHandlerSaga } from "./usersHandlerSaga";


export function* usersWatcherSaga(){
    yield takeEvery(LOGIN,loginHandlerSaga)
}