import { call, CallEffect, put, PutEffect, select, SelectEffect } from "redux-saga/effects";
import {RootState} from '../../store'
import { updateConversations } from "./messagingActions";
import {  SET_NEW_CONVERSATIONS } from "./messagingSlice";
import { Conversation, GetConversationApiResponse } from "./messagingZodSchemas";

const getUserId = (state:RootState) => state.users.userId

export function* updateConversationsHandlerSaga():
Generator<SelectEffect | SelectEffect | CallEffect<GetConversationApiResponse> | PutEffect<{type:string,payload:GetConversationApiResponse}>,void,number & string & GetConversationApiResponse> 
{
    const userId = (yield select(getUserId)) as number
    const accessToken = (yield select(state => state.users.accessToken)) as string
    const apiResponse = (yield call(updateConversations,accessToken as string,userId as number)) as GetConversationApiResponse
    yield put(SET_NEW_CONVERSATIONS(apiResponse))
}