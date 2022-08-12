import { RootState } from "../../store";

//Zod iz used for typing the data we get from api's
import {z} from "zod";
import axios, { AxiosResponse } from 'axios';
import { processListOfSymbols } from "../../utility/csvUtility";
import { IStockDataType, stockDataSchema, symbolListSchema } from "./stocksZodSchemas";
import { BASE_URL } from "../../constants/urls";
import { connect, Connect } from "react-redux";

export type IStockQueryParameters = {
    function: ,
    symbol: string,
    interval: string,
}

interface ISymbolList{
    name: string,
    date: Date, 
    delistingDate: Date | null | string,
    status: string,
}

export const getSymbols  = async () => {
    const response = await axios.request<ISymbolList>({
        method: 'get',
        url: 'https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo'
    });
    const processedResponse = processListOfSymbols(response.data.toString());
    symbolListSchema.parse(processedResponse);
    return processedResponse;
}
interface IStockDataApiResponseSingleDateUnit{
    [functionName : string] : {
     [dataIndex:string]: {
        "1. open": number,
        "2. high": number,
        "3. low": number,
        "4. close": number,
        "5. volume": number } 
    }}



interface IStockDataApiResponseMetaPart{
    "Meta Data":{
        "1. Information" : string,
        "2. Symbol": string,
        "3. Last Refreshed": string,
        "4. Output Size" : string,
        "5. Time Zone" : string,
    },
}



export type IStockDataApiResponse = IStockDataApiResponseMetaPart
 & IStockDataApiResponseSingleDateUnit;

export const getStockData = (stockInfo: IStockQueryParameters) => {
    return axios.request<IStockDataApiResponse>({
        method: 'get',
        url:'${BASE_URL}stocks/',
        data:stockInfo
    }).then(
        (response) => {
            stockDataSchema.parse(response.data);

            return response.data;
        })
        .catch( err => {
            console.log();
            throw err;
        })
}


