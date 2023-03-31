import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store";
import { GetUserInfoApiResponse } from "../adminMainPageSchema";

interface  adminState{
    userData:GetUserInfoApiResponse
}

const initialState:adminState= {
    userData: []
}

export const adminSlice = createSlice({
    name: 'admins',
    initialState:initialState,
    reducers:{
        SET_USER_DATA: (state,action:PayloadAction<GetUserInfoApiResponse>) => {
            state.userData = action.payload
        }
    }
})

export const {SET_USER_DATA} = adminSlice.actions