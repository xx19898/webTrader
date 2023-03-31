import { takeEvery } from "redux-saga/effects";
import { fetchUserDataHandlerSaga } from "./adminHandlerSaga";


export function* watchAdmin(){
    yield takeEvery('UPDATE_USER_DATA',fetchUserDataHandlerSaga)
} 