import { getSymbols } from "../state/Stocks/stocksActions";
import { IStockSymbolList } from "../state/Stocks/stocksZodSchemas";

var jquerycsv = require('jquery-csv');

export function processListOfSymbols(csv:string):IStockSymbolList{
    return jquerycsv.toObjects(csv);
}