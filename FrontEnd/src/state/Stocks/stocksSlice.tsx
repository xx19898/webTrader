import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GET_INITIAL_STOCK, UPDATE_CURRENT_STOCKS} from './stocksActionTypes';
import { RootState } from '../../store';
import { IStockDataApiResponse } from './stocksActions';
import { fromApiDataToDatasetFormat} from './stockViewerChartDataUtility';

export type IDataset = {
    label: string,
    data: number[],
    fill?: boolean ,
    borderColor: string,
    tension: number,
}
export type IAdditionalStockData = {
        [date:string]:ISingleStockInfo
}
export type ISingleStockInfo = {
    "1. open": number,
    "2. high": number,
    "3. low": number,
    "4. close": number,
    "5. volume": number,
}
export type IDatasetAndFullData = {
    dataset: IDataset
    fullData: IAdditionalStockData
}
export type IStockState = {
    labels: Date[],
    datasets: IDatasetAndFullData[] ,
}
const stockInitialState: IStockState = {
    labels: [],
    datasets: []
}


export const stockSlice = createSlice({
    name:'stocks',
    initialState:stockInitialState,
    reducers:{
        UPDATE_CURRENT_STOCKS: (state, action: PayloadAction<IStockDataApiResponse>) => {
            const copyOfCurrentDatasets = [...state.datasets];
            const updatedState = {...state, datasets: [...state.datasets, fromApiDataToDatasetFormat(action.payload,copyOfCurrentDatasets)]};
            state = updatedState;
            console.log({state});
        }}
})



