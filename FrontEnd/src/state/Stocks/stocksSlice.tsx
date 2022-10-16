import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GET_INITIAL_STOCK, GET_SYMBOLS, UPDATE_CURRENT_STOCKS} from './stocksActionTypes';
import { RootState } from '../../store';
import { deleteOlderVersionsOfStockData, fromApiDataToDatasetFormat, getLabelsFromApiData} from './stockViewerChartDataUtility';
import { CommonDataForSingleTimeUnit, CommonMetaData, IStockSymbolList, StockDataApiResponse, StockDataForSingleSymbol, StockDataForSingleSymbolDataPart, StockDataForSingleSymbolDataPartDeeperObject } from './stocksZodSchemas';
import { stockFunctionTypes } from './stocksRequestTypes';

export type Dataset = {
    metadata: CommonMetaData,
    data: StockDataForSingleSymbolDataPart,
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
    tension = 1}
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
    labels: string[],
    currentTimeSeries: stockFunctionTypes,
    symbols: IStockSymbolList
}

const StockInitialState: IStockState = {
    datasets: [],
    labels:[],
    currentTimeSeries: stockFunctionTypes.DAILY,
    symbols: [],
}


export const stockSlice = createSlice({
    name:'stocks',
    initialState:StockInitialState,
    reducers:{
        UPDATE_CURRENT_STOCKS: (state, action: PayloadAction<StockDataApiResponse>) => {
            const newDatasets: Dataset[] = fromApiDataToDatasetFormat(action.payload,state.datasets);
            const renewedOldDatasets = deleteOlderVersionsOfStockData({newDatasets: newDatasets,oldDatasets:state.datasets})
            const newLabels = getLabelsFromApiData({apiData:action.payload});
            state.datasets = renewedOldDatasets.concat(newDatasets);
        },
        UPDATE_SYMBOL_LIST: (state, action: PayloadAction<IStockSymbolList>) => {
            state.symbols = action.payload;
        },
    }
})







