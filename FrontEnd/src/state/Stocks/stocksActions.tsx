import axios from 'axios';
import { BASE_URL } from '../../constants/urls';
import { processListOfSymbols } from "../../utility/csvUtility";
import { IStockQueryParamsIntraday, IStockQueryParamsNonIntraday , ISymbolList, stockFunctionTypes } from './stocksRequestTypes';
import { concatListOfSymbols } from './stocksUtility';
import { StockDataApiResponse, stockDataSchema, symbolListSchema } from "./stocksZodSchemas";



export const getSymbols  = async () => {
    const response = await axios.request<ISymbolList>({
        method: 'get',
        url: 'https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo'
    });
    const processedResponse = processListOfSymbols(response.data.toString());
    symbolListSchema.parse(processedResponse);
    return processedResponse;
}


export const getStockData = (queryParams: IStockQueryParamsIntraday | IStockQueryParamsNonIntraday) => {
    const symbolsAsOneString = concatListOfSymbols(queryParams.symbols)
    return axios.request<StockDataApiResponse>({
        method: 'get',
        url: 'interval' in queryParams ? 
        `${BASE_URL}stocks/
        ?function=${(queryParams.function)}
        &symbols=${symbolsAsOneString},
        &interval=${(queryParams.interval)}`
        :
        `${BASE_URL}stocks/
        ?function=${(queryParams.function)}
        &symbols=${symbolsAsOneString}`
        
    }).then(
        (response) => {
            stockDataSchema.parse(response.data);
            return response.data;
        })
        .catch( err => {
            console.log();
            throw err;
        })}


