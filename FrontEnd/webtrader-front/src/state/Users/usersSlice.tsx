import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface IUserState{
    loggedUser: String | null,
}
const initialState: IUserState = {
    loggedUser: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        SET_NEW_LOGGED_USER: () => {
            console.log("hello");
            
        }
    }
})