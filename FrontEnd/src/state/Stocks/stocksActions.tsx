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
    const validatedSymbolList = symbolListSchema.parse(processedResponse);
    return validatedSymbolList;
}


export type IStockQueryParams =  IStockQueryParamsIntraday | IStockQueryParamsNonIntraday

export const getStockData = async (queryParams: IStockQueryParams) => {
    
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
    const apiResponse = await axios.request(axiosConfig).then(
        (response) => {
            return response.data
        })
        .catch( err => {
            console.log();
            throw err;
        })
    return stockDataApiResponse.parse(apiResponse)
    
    }


