import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { stockTypes } from './stockTypes';

type ISingleStockInfo = {
    open: number,
    high: number,
    close: number,
    volume: number,
}

interface ILastViewedStockInfo{
    lastViewedStockSymbol: String | null,
    lastViewedStockFunction: stockTypes | null,
    lastViewedStockData: {
        [key: string] : ISingleStockInfo | null,
    } | null,
}

interface IStocksState{
    lastViewedStockInfo: ILastViewedStockInfo | null
}

const initialState: IStocksState = {
    lastViewedStockInfo: null,

}

export const stockSlice = createSlice({
    name:'stocks',
    initialState,
    reducers:{
        //CONTINUE HERE WITH FULFILLING THE
        // SAGA STUFF FOR FETCHING THE STOCK DATA
        // AND SETTING A LIMIT OF 5 REQS PER MINUTE
    }


})