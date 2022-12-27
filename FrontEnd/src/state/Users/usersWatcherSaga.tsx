import { takeEvery } from "redux-saga/effects";
import {LOGIN,LOGOUT,REGISTER} from "./usersActionTypes";
import { loginHandlerSaga, registerHandlerSaga } from "./usersHandlerSaga";


export function* usersWatcherSaga(){
    yield takeEvery(LOGIN,loginHandlerSaga),
    yield takeEvery(REGISTER,registerHandlerSaga)
}