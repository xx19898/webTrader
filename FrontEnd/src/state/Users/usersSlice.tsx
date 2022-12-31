import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface IUserState{
    loggedUser?: string,
    accessToken?: string    
}
const initialState: IUserState = {
    loggedUser: undefined,
    accessToken: undefined,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        SET_NEW_LOGGED_USER: (state,action: PayloadAction<string>) => {
            state.loggedUser = action.payload
        },
        SET_NEW_ACCESS_TOKEN:(state, action:PayloadAction<string>) => {
            state.accessToken = action.payload
        },
    }
})