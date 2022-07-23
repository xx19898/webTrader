import {createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        setLoggedInUser: (state,action: PayloadAction<IUserState>) => {
            
        }
    }
})