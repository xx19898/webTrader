import { getDeltaE00 } from "delta-e";
import { createDataset, Dataset } from "./stocksSlice";
import { CommonMetaData, DataEntryNames, DATA_ENTRY_NAMES, stockDataApiResponse, StockDataApiResponse, StockDataForSingleSymbol, stockDataForSingleSymbol } from "./stocksZodSchemas";

export const MIN_DIST_BETWEEN_COLORS = 10;



// getting random rgb for every chart dataset to differentiate between the lines
export function random_rgb(){
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}



export function getValuesOutOfRgbString(rgbString : String){
    const rgbStringSplittedWithoutFirstBracket = rgbString.split("("); 
    rgbStringSplittedWithoutFirstBracket.shift();
    var rgbStringSplittedbyCommas = rgbStringSplittedWithoutFirstBracket[0].split(",");
    const lastEl = rgbStringSplittedbyCommas[rgbStringSplittedbyCommas.length - 1].split(")");
    rgbStringSplittedbyCommas.pop();
    rgbStringSplittedbyCommas.push(lastEl[0]);
    const finalRgbValueArr = rgbStringSplittedbyCommas.map( element => {return Number(element)});
    return finalRgbValueArr;
}

const getRandomRgbColor = (datasetsAlreadyInState:Dataset[]) => 
{
        var randomRgbForNewLine = "";
        var randomRgbForNewLineNotUsedInOtherDatasetsChecked = false;
        const getRandomRgbColor = () => {
        while(!randomRgbForNewLineNotUsedInOtherDatasetsChecked){
            randomRgbForNewLine = random_rgb();
            var simularitiesNotFound = false;
            datasetsAlreadyInState.map( datasetInfo => {
                const datasetsBorderColorValues = getValuesOutOfRgbString(datasetInfo.borderColor);
                const randomRgbForNewLineValues = getValuesOutOfRgbString(randomRgbForNewLine);
                if(MIN_DIST_BETWEEN_COLORS >
                    (getDeltaE00({L:datasetsBorderColorValues[0],A:datasetsBorderColorValues[1],B:datasetsBorderColorValues[2]}
                    ,{L:randomRgbForNewLineValues[0],A:randomRgbForNewLineValues[1],B:randomRgbForNewLineValues[2]})))
                    {
                        simularitiesNotFound = false;
                    } 
            })
            if (simularitiesNotFound) randomRgbForNewLineNotUsedInOtherDatasetsChecked = true;
        }
        }
        return randomRgbForNewLine;
}
export const fromApiDataToDatasetFormat = (apiStockData:StockDataApiResponse,datasetsAlreadyInState:Dataset[]) => {
    let newDatasets: Dataset[] = []; 
    Object.values(apiStockData).forEach( dataOnCertainSymbol => {
        const dataEntryName = Object.keys(dataOnCertainSymbol).find(key => {
             return Object.values(DATA_ENTRY_NAMES).some((dataEntryName) => key === dataEntryName)
        })
        if(dataEntryName === undefined){
            throw new TypeError("Time Series Key was not found");
        }  
        const borderColorForNewDataset = getRandomRgbColor(datasetsAlreadyInState);
        const metaData =  dataOnCertainSymbol["Meta Data"];
        const data = dataOnCertainSymbol[dataEntryName];
        const newDataset = createDataset({data:data,metadata:metaData,borderColor:borderColorForNewDataset})
        newDatasets.push(newDataset);
    })
    return newDatasets;
}

export const deleteOlderVersionsOfStockData = (params:{newDatasets: Dataset[],oldDatasets: Dataset[]}) => {
    const listOfNewSymbols: String[] = params.newDatasets.map(dataset => dataset.metadata["2. Symbol"]);
    const renewedOldDatasets = params.oldDatasets.filter(dataset => 
        listOfNewSymbols.every( newSymbol =>
            !(newSymbol  === dataset.metadata["2. Symbol"])
            ))
    return renewedOldDatasets;
}

export const getLabelsFromApiData = (props:{apiData:Object}) => {
    const validatedStockData = stockDataApiResponse.parse(props.apiData);
    const dataOnFirstStockInArray = Object.values(validatedStockData)[0];
    const dataEntry = Object.keys(dataOnFirstStockInArray).find( key => Object.values(DATA_ENTRY_NAMES).some( dataEntry => dataEntry === key))
    if(dataEntry){
        return Object.keys(dataOnFirstStockInArray[dataEntry])
    }else{
        throw Error('Time Series Entry was not found on the stock data')
    }
}

