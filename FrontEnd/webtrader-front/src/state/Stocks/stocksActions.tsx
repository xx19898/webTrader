import { RootState } from "../../store";

//Zod iz used for typing the data we get from api's
import {z} from "zod";
import axios, { AxiosResponse } from 'axios';
import { processListOfSymbols } from "../../utility/csvUtility";
import { IStockDataType, stockDataSchema, symbolListSchema } from "./stocksZodSchemas";
import { BASE_URL } from "../../utility/urls";
import { connect, Connect } from "react-redux";

export type IStockQueryParameters = {
    function: string,
    symbol: string,
    interval: string,
}










export const getSymbols  = () => {
    axios.request<Object>({
        method:'get',
        url:'https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo'
    }).then( (response) => {
        console.log(response);
        const processedResponse = processListOfSymbols(response.data.toString());
        console.log(processedResponse);
        symbolListSchema.parse(processedResponse);
        return processedResponse;
        
    })
}
interface IStockDataSingleUnit{
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



type IStockDataApiResponse = IStockDataApiResponseMetaPart
 & IStockDataSingleUnit;

export const getStockData = (stockInfo: IStockQueryParameters) => {
    return axios.request<IStockDataApiResponse>({
        method: 'get',
        url:'${BASE_URL}stocks/initialStockData',
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

//TODO: CONTINUE HERE
export const fromApiDataToDatasetFormat = (apiStockData:IStockDataApiResponse) => {
    const datasetFormatObject: IDataset = {
        label: apiStockData["Meta Data"]["2. Symbol"],
        data: Object.values(apiStockData[Object.keys(apiStockData)[0]]).map((dataKey)=> {
            return dataKey["4. close"];
        }),
        fill: true,
        borderColor: random_rgb(),
        tension: 0
    }

    return datasetFormatObject;
    

}

