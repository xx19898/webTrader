import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GET_INITIAL_STOCK, UPDATE_CURRENT_STOCKS} from './stocksActionTypes';
import { RootState } from '../../store';
import { fromApiDataToDatasetFormat} from './stockViewerChartDataUtility';
import { CommonDataForSingleTimeUnit, CommonMetaData, StockDataApiResponse, StockDataForSingleSymbol, StockDataForSingleSymbolDataPart, StockDataForSingleSymbolDataPartDeeperObject } from './stocksZodSchemas';

export type Dataset = {
    metadata: CommonMetaData,
    data: StockDataForSingleSymbol,
    fill?: boolean,
    borderColor: string,
    tension: number,
}

//Defaults tension to 1 and fill to true
export function createDataset({
    metadata,
    data,
    fill = true,
    borderColor,
    tension=1}
    :
    {
        metadata: CommonMetaData,
        data: StockDataForSingleSymbolDataPart,
        fill?:boolean,
        borderColor:string,
        tension?: number,
    }):Dataset{
    return {
        metadata,
        data,
        fill,
        borderColor,
        tension
    }
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



