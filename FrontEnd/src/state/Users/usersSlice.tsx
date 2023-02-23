import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { StockDeal } from '../../sharedComponents/portfolioManager/stockDealVisualizer';

interface IUserState{
    loggedUser?: string,
    userRole?: 'USER' | 'ADMIN',
    accessToken?: string,
    stockDeals?:StockDeals,
}

const initialState: IUserState = {
    loggedUser: undefined,
    userRole: undefined,
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
        SET_STOCK_DEALS:(state, action:PayloadAction<StockDeals>) => {
            //TODO: implement sorting the stockdeals array on basis of created_date
            const stockDealsTemp = action.payload
            stockDealsTemp.sort(function(a,b){
                if(a.createdDate > b.createdDate){
                    return - 1
                }
                return 1
            })
            state.stockDeals = stockDealsTemp
        },
        
    }
})

export const {SET_NEW_ACCESS_TOKEN,SET_NEW_LOGGED_USER,SET_STOCK_DEALS} = userSlice.actions