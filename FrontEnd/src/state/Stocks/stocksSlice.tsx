import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GET_INITIAL_STOCK, UPDATE_CURRENT_STOCKS} from './stocksActionTypes';
import { RootState } from '../../store';
import { fromApiDataToDatasetFormat} from './stockViewerChartDataUtility';
import { CommonDataForSingleTimeUnit, CommonMetaData, StockDataApiResponse } from './stocksZodSchemas';

export type Dataset = {
    metadata: CommonMetaData,
    data: {[date:string]:CommonDataForSingleTimeUnit}[],
    fill?: boolean,
    borderColor: string,
    tension: number,
}

export type IStockState = {
    datasets: Dataset[],
}
const stockInitialState: IStockState = {
    datasets: []
}


export const stockSlice = createSlice({
    name:'stocks',
    initialState:stockInitialState,
    reducers:{
        UPDATE_CURRENT_STOCKS: (state, action: PayloadAction<StockDataApiResponse>) => {
            const copyOfCurrentDatasets = [...state.datasets];
            const updatedState = {...state, datasets: [...state.datasets, fromApiDataToDatasetFormat(action.payload,copyOfCurrentDatasets)]};
            state = updatedState;
            console.log({state});
        }}
})



