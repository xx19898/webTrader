import { takeEvery } from "redux-saga/effects";
import { updateConversationsHandlerSaga } from "./messagingHandlerSaga";

export function * messagingWatcherSaga(){
    yield takeEvery('UPDATE_CONVERSATIONS',updateConversationsHandlerSaga)
}