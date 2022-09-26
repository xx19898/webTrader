

export type IStockQueryParamsIntraday = {
    function: stockFunctionTypes,
    symbols: string[],
    interval: string,
}

export type IStockQueryParamsNonIntraday = {
    function: stockFunctionTypes,
    symbols: string[],
}

export type ISymbolList = {
    name: string,
    date: Date, 
    delistingDate: Date | null | string,
    status: string,
}

export enum stockFunctionTypes{
    INTRADAY = "TIME_SERIES_INTRADAY",
    DAILY = "TIME_SERIES_DAILY",
    DAILY_ADJUSTED = "TIME_SERIES_DAILY_ADJUSTED",
    WEEKLY = "TIME_SERIES_WEEKLY",
    WEEKLY_ADJUSTED  = "TIME_SERIES_WEEKLY_ADJUSTED",
    MONTHLY = "TIME_SERIES_MONTHLY",
    MONTHLY_ADJUSTED = "TIME_SERIES_MONTHLY_ADJUSTED"
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