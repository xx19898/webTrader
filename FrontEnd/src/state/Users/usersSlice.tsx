import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { StockDeal } from '../../sharedComponents/portfolioManager/stockDealVisualizer';

interface IUserState{
    loggedUser?: string,
    accessToken?: string,
    stockDeals?:StockDeals  
}
const initialState: IUserState = {
    loggedUser: undefined,
    accessToken: undefined,
    stockDeals: undefined,
}

type StockDeals = StockDeal[]

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        SET_NEW_LOGGED_USER: (state,action: PayloadAction<string>) => {
            console.log("SETTING NEW USER")
            state.loggedUser = action.payload
        },
        SET_NEW_ACCESS_TOKEN:(state, action:PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        UPDATE_STOCK_DEALS:(state, action:PayloadAction<StockDeals>) => {
            state.stockDeals = action.payload
        },
        
    }
})

export const userActions = userSlice.actions