import { RootState } from "../../store";

//Zod iz used for typing the data we get from api's
import {z} from "zod";
import axios from 'axios';
import { processListOfSymbols } from "../../utility/csvUtility";
import { IStockDataType, stockDataSchema, symbolListSchema } from "./stocksZodSchemas";
import { BASE_URL } from "../../utility/urls";
import { connect, Connect } from "react-redux";

export type IStockQueryParameters = {
    function: string,
    symbol: string,
    interval: string,
}








//TODO CONTINUE WRITING A QUERY TO GET LIST OF ALL SYMBOLS
//url: https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo
//TODO PARSE CSV DATA FROM THE URL INTO JAVASCRIPT OBJECTS USING JQUERY-CSV PACKAGE
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
    }[]}



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
    axios.request<IStockDataSingleUnit>({
        method: 'get',
        url:'${BASE_URL}stocks/initialStockData',
        data:stockInfo
    }).then(
        (response) => {
            stockDataSchema.parse(response.data);
            setNewCurrentStock(response.data.functionName);

            return response
        })
        .catch( err => {
            console.log(err)
        })
}
//TODO: CONTINUE HERE
export const setNewCurrentStock = (newStockData: IDataset,currentStockDataState: IStockViewerChartData) => {
    const newStockDataState = {... currentStockDataState};
    return newStockDataState.datasets = [ ... newStockDataState.datasets, ]
    //TODO: have to implement getting access to state in the handler saga with the 'select' function



    


}
