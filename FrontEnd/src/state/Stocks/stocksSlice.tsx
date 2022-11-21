import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { deleteOlderVersionsOfStockData, fromApiDataToDatasetFormat, getLabelsFromApiData} from './stockViewerChartDataUtility';
import { CommonMetaData, IStockSymbolList, ITimeToWaitForApiRequestSlots, StockDataApiResponse, StockDataForSingleSymbolDataPart, StockDataForSingleSymbolDataPartDeeperObject } from './stocksZodSchemas';
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
    return{
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
    symbols: IStockSymbolList,
    timeToWaitForApiRequestSlots: Date[]
}

const StockInitialState: IStockState = {
    datasets: [],
    labels:[],
    currentTimeSeries: stockFunctionTypes.DAILY,
    symbols: [],
    timeToWaitForApiRequestSlots: []
}


export const stockSlice = createSlice({
    name:'stocks',
    initialState:StockInitialState,
    reducers:{
        UPDATE_CURRENT_STOCKS: (state, action: PayloadAction<StockDataApiResponse>) => {
            const newDatasets: Dataset[] = fromApiDataToDatasetFormat(action.payload,state.datasets);
            const renewedOldDatasets = deleteOlderVersionsOfStockData({newDatasets: newDatasets,oldDatasets:state.datasets})
            console.log("got to before newLabels")
            const newLabels = getLabelsFromApiData({apiData:action.payload});
            console.log("got here")
            state.datasets = renewedOldDatasets.concat(newDatasets);
            
        },
        UPDATE_SYMBOL_LIST: (state, action: PayloadAction<IStockSymbolList>) => {
            state.symbols = action.payload;
        },
        RENEW_API_REQUEST_SLOTS:(state, action: PayloadAction<ITimeToWaitForApiRequestSlots>) => {
                const calculatedExpirationDates = action.payload.cooldownExpirationTimeForApiRequests.map( timeToWaitInSeconds => {
                    const finalTime = new Date()
                    finalTime.setSeconds(finalTime.getSeconds() + timeToWaitInSeconds)
                    return finalTime;
                })
                state.timeToWaitForApiRequestSlots = calculatedExpirationDates
            }
    }
})

export const {UPDATE_CURRENT_STOCKS,UPDATE_SYMBOL_LIST,RENEW_API_REQUEST_SLOTS} = stockSlice.actions;





