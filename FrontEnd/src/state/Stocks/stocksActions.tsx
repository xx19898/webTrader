import axios from 'axios';
import { BASE_URL} from '../../constants/urls';
import { processListOfSymbols} from "../../utility/csvUtility";
import { IStockQueryParamsIntraday, IStockQueryParamsNonIntraday , ISymbolList, stockFunctionTypes } from './stocksRequestTypes';
import { concatListOfSymbols} from './stocksUtility';
import { stockDataApiResponse, StockDataApiResponse, symbolListSchema} from "./stocksZodSchemas";



export const getSymbols  = async () => {
    const response = await axios.request<ISymbolList>({
        method: 'get',
        url: 'https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo'
    });
    const processedResponse = processListOfSymbols(response.data.toString());
    symbolListSchema.parse(processedResponse);
    return processedResponse;
}


export type IStockQueryParams =  IStockQueryParamsIntraday | IStockQueryParamsNonIntraday

export const getStockData = (queryParams: IStockQueryParams) => {
    const symbolsAsOneString = concatListOfSymbols(queryParams.symbols)
    const axiosConfig = {
        method: 'get',
        url: 'interval' in queryParams ? 
        `${BASE_URL}stocks/getStockData?function=${(queryParams.function)}&symbols=${symbolsAsOneString},&interval=${(queryParams.interval)}`
        :
        `${BASE_URL}stocks/getStockData?function=${(queryParams.function)}&symbols=${symbolsAsOneString}`
        
    }
    const axiosPromise = axios.request<StockDataApiResponse>(axiosConfig).then(
        (response) => {
            return stockDataApiResponse.parse(response.data);
        })
        .catch( err => {
            console.log();
            throw err;
        })
        return axiosPromise
    }


