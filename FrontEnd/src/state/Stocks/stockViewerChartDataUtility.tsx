import { getDeltaE00 } from "delta-e";
import { Dataset } from "./stocksSlice";
import { CommonMetaData, stockDataApiResponse, StockDataApiResponse, StockDataForSingleSymbol, stockDataForSingleSymbol } from "./stocksZodSchemas";

export const MIN_DIST_BETWEEN_COLORS = 10;



// getting random rgb for every chart dataset to differentiate between the lines
export function random_rgb(){
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}



export function getValuesOutOfRgbString(rgbString : String) {
    const rgbStringSplittedWithoutFirstBracket = rgbString.split("("); 
    rgbStringSplittedWithoutFirstBracket.shift();
    var rgbStringSplittedbyCommas = rgbStringSplittedWithoutFirstBracket[0].split(",");
    const lastEl = rgbStringSplittedbyCommas[rgbStringSplittedbyCommas.length - 1].split(")");
    rgbStringSplittedbyCommas.pop();
    rgbStringSplittedbyCommas.push(lastEl[0]);
    const finalRgbValueArr = rgbStringSplittedbyCommas.map( element => {return Number(element)});
    return finalRgbValueArr;
}

const getRandomRgbColorAndCheckItIsNotUsedInOtherDatasets = (datasetsAlreadyInState:IDatasetAndFullData[]) => 
{
        var randomRgbForNewLine = "";
        var randomRgbForNewLineNotUsedInOtherDatasetsChecked = false;
        const getRandomRgbColor = () => {
        while(!randomRgbForNewLineNotUsedInOtherDatasetsChecked){
            randomRgbForNewLine = random_rgb();
            var simularitiesNotFound = false;
            datasetsAlreadyInState.map( datasetInfo => {
                const datasetsBorderColorValues = getValuesOutOfRgbString(datasetInfo.dataset.borderColor);
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
export const fromApiDataToDatasetFormat = (apiStockData:StockDataApiResponse,datasetsAlreadyInState: Dataset[]) => {
    let newDatasets: Dataset[] = []; 

    for(const key in apiStockData){
        console.log(apiStockData[key]["Meta Data"]);
    }
    Object.values(apiStockData).forEach( dataOnCertainSymbol => {
        let newDataset: Dataset = {
            metadata: dataOnCertainSymbol["Meta Data"],
            borderColor: getRandomRgbColorAndCheckItIsNotUsedInOtherDatasets([...datasetsAlreadyInState]),
            data: dataOnCertainSymbol["functionName"],

        };

    })
    


//    Object.keys(apiStockData[Object.keys(apiStockData)[1]]).forEach( date => {
//        additionalData[date] = apiStockData[Object.keys(apiStockData)[1]][date];
//       data.push( apiStockData[Object.keys(apiStockData)[1]][date]["4. close"]);
//    })



    //TODO: redo this so that on types are ok and additionaldata is getting populated on the same iteration as data(maybe in a loop outside of the object by creating two arrays)
    
    return datasetFormatObject;
}

