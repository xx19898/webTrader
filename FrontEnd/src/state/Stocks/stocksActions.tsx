import axios, { AxiosError } from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { z } from 'zod';
import { cooldownExpirationTimeForStockApiRequestSlotInSeconds } from '../../constants/stocksRelatedConstants';
import { BASE_URL} from '../../constants/urls';
import { AppDispatch } from '../../store';
import { processListOfSymbols} from "../../utility/csvUtility";
import { RENEW_STOCK_API_REQUEST_SLOTS } from './stocksActionTypes';
import { IStockQueryParamsIntraday, IStockQueryParamsNonIntraday , ISymbolList, stockFunctionTypes } from './stocksRequestTypes';
import { concatListOfSymbols} from './stocksUtility';
import { stockDataApiResponse, StockDataApiResponse, symbolListSchema} from "./stocksZodSchemas";



export const getSymbols  = async (accessToken:string) => {
    const response = await axios.request<ISymbolList>({
        method: 'get',
        headers:{
            Authorization: accessToken,
        },
        withCredentials: true,
        url: BASE_URL + 'stocks/symbols'
    });
    const processedResponse = processListOfSymbols(response.data.toString());
    const validatedSymbolList = symbolListSchema.parse(processedResponse);
    return validatedSymbolList;
    //NO PROBLEMS HERE
}

//TODO: test
export const renewApiRequestSlots = ({timeToWaitInSeconds}:{timeToWaitInSeconds:number[]}) => {
    const calculatedExpirationDates = timeToWaitInSeconds.map( timeToWaitInSeconds => {
        const finalTime = new Date()
        finalTime.setSeconds(finalTime.getSeconds() + timeToWaitInSeconds)
        return finalTime;
    })
    return calculatedExpirationDates;
}


export type IStockQueryParams =  IStockQueryParamsIntraday | IStockQueryParamsNonIntraday

export const getStockData = (queryParams: IStockQueryParams) => {
    const symbolsAsOneString = 
    (queryParams.symbols.length === 1) 
    ? queryParams.symbols[0]
    : concatListOfSymbols([...queryParams.symbols])

    const axiosConfig = {
        method: 'get',
        url: (typeof (queryParams as IStockQueryParamsIntraday).interval !== 'undefined') ? 
        `${BASE_URL}stocks/getStockData?function=${(queryParams.function)}&symbols=${symbolsAsOneString},&interval=${((queryParams as IStockQueryParamsIntraday).interval)}`
        :
        `${BASE_URL}stocks/getStockData?function=${(queryParams.function)}&symbols=${symbolsAsOneString}`    
    }
    return trackPromise(axios.request(axiosConfig).then(
        (response) => {
            return stockDataApiResponse.parse(response.data)
        })
        .catch( (err: Error | AxiosError) => {
            throw err;
        }))
    }


