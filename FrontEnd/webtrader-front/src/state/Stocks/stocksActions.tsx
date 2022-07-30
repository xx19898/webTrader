import { RootState } from "../../store";

//Zod iz used for typing the data we get from api's
import {z} from "zod";
import axios from 'axios';
import { processListOfSymbols } from "../../utility/csvUtility";
import { symbolListSchema } from "./stocksZodSchemas";

export type IStockFunction = {
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

export const getStockData = (stockInfo: IStockFunction) => {
    axios.request({
        method: 'get',
        url:'https://localhost:8000/stocks/initialStockData',
        data:stockInfo
    }).then(
        (response) => {
            return response
        })
        .catch( err => {
            console.log(err)
        })
}