import { call, CallEffect, put, PutEffect, select, SelectEffect } from "redux-saga/effects"
import { RootState } from "../../../../store"
import { GetUserInfoApiResponse } from "../adminMainPageSchema"
import { attainUserPortfolioData } from "./adminActions"
import { SET_USER_DATA } from "./adminSlice"

export const getAccessToken = (state:RootState) => state.users.accessToken

export function* fetchUserDataHandlerSaga():
Generator<SelectEffect | CallEffect<GetUserInfoApiResponse> | PutEffect<{type:string,payload:GetUserInfoApiResponse}>,void,string | GetUserInfoApiResponse>
{
    console.log("GOT TO USERDATAHANDLERSAGA")
    const accessToken = (yield select(getAccessToken)) as string
    const usersData = (yield call(attainUserPortfolioData,accessToken)) as GetUserInfoApiResponse
    yield put(SET_USER_DATA(usersData))
}