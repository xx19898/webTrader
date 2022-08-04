import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { stockTypes } from './stockTypes';
import {GET_INITIAL_STOCK, UPDATE_CURRENT_STOCKS} from './stocksActionTypes';
import { RootState } from '../../store';


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


const stockInitialState: IStockViewerChartData = {
    labels: [],
    datasets: []
}


export const stockSlice = createSlice({
    name:'stocks',
    initialState:stockInitialState,
    reducers:{
        UPDATE_CURRENT_STOCKS: (state, action: PayloadAction<IDataset>) => {
            const updatedState = {...state, datasets: [...state.datasets, action.payload]};
            state = updatedState;
        }}
})



