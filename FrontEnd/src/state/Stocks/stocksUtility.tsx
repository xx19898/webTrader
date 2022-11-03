import { stockFunctionTypes } from "./stocksRequestTypes";


export const concatListOfSymbols = (listOfSymbols:string[]) : string => {
    return listOfSymbols.reduce(function(prevVal,currVal){
        if(prevVal == undefined) return currVal;
        return prevVal.concat(`,${currVal}`)
    },)
}

