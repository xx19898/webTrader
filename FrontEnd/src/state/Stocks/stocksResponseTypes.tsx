export type BaseMetaDataPart = {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
}

export type IntradayMetaData = {
    basePart: BaseMetaDataPart,
    "4. Interval": string,
    "5. Output Size": string,
    "6. Time Zone": string,
}

export type DailyAndDailyAdjustedMetaData = {
    basePart: BaseMetaDataPart,
    "4. Output Size": string,
    "5. Time Zone": string,
}

export type WeeklyAndMonthlyAndAdjustedMetaData = {
    basePart: BaseMetaDataPart,
    "4. Time Zone": string,
}

export type SingleTimeUnitBasePart = {
    "1. open": number,
    "2. high": number,
    "3. low": number,
    "4. close": number,
}

export type SingleTimeUnitDailyAndIntraday = {
    basePart : SingleTimeUnitBasePart,
    "5. volume": number,
}

export type SingleTimeUnitDailyAdjusted = {
    basePart: SingleTimeUnitBasePart,
    
}