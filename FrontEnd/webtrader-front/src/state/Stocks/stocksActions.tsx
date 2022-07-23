import { RootState } from "../../store";
//Zod iz used for typing the data we get from api's
import {z} from "zod";
import axios from 'axios';
/*
1)Intraday:
function symbol interval
2)Daily
function symbol 
3)Weekly 
function symbol
4)Weekly adjusted
function symbol
5)Monthly
function symbol
6)Monthly Adjusted
function symbol
*/
export type IStockFunction = {
    function: string,
    symbol: string,
    interval: string,
}

const stockData = z.object({
    
})

//TODO CONTINUE WRITING A QUERY TO GET LIST OF ALL SYMBOLS
export const getSymbols <T> = (val:T) => {
    axios({
        method

    })
}

export const getStockData = (stockInfo: IStockFunction) => {
    axios({
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