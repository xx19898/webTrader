import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { StockDeal } from '../../sharedComponents/portfolioManager/stockDealVisualizer';
import User from './UserClass';
import { Authorities } from './userZodSchemas';


export const UserAuthority = ['ROLE_USER' , 'ROLE_ADMIN'] as const

interface IUserState{
    loggedUser?: string,
    userAuthorities?: Authorities,
    accessToken?: string,
    userId?: number,
    stockDeals?:StockDeals,
}

const initialState: IUserState = {
    loggedUser: undefined,
    userAuthorities: undefined,
    userId: undefined,
    accessToken: undefined,
    stockDeals: undefined,
}

type StockDeals = StockDeal[]

//TODO: Implement the "authorities" part in userSlice so that the authorities received as response to logging in are being saved in state
//TODO: and different main pages are being shown depending on which authorities user has

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        SET_NEW_LOGGED_USER: (state,action: PayloadAction<string>) => {
            state.loggedUser = action.payload
        },
        SET_NEW_LOGGED_USER_ID: (state,action: PayloadAction<number>) => {
            state.userId = action.payload
        },
        SET_NEW_AUTHORITIES: (state,action: PayloadAction<Authorities>) => {
            state.userAuthorities = action.payload
        },
        SET_NEW_ACCESS_TOKEN:(state, action:PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        SET_STOCK_DEALS:(state, action:PayloadAction<StockDeals>) => {
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

export const {SET_NEW_ACCESS_TOKEN,SET_NEW_LOGGED_USER,SET_NEW_LOGGED_USER_ID,SET_STOCK_DEALS,SET_NEW_AUTHORITIES} = userSlice.actions