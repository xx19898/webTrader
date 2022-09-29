import {number, z} from 'zod';

const dateSchema = z.preprocess((arg) => {
    if(typeof arg == "string" || arg instanceof Date) return new Date(arg);
},z.date());
type dateOrString = z.infer<typeof dateSchema>;

export const stringAsNumber = z.preprocess((arg) => {
    if((typeof arg == "string") || (typeof arg == "object")) return Number(arg)
},z.number())


const MetadataBasePart = z.object({
    "1. Information": z.string(),
    "2. Symbol": z.string(),
    "3. Last Refreshed": z.string(),
});

const IntradayMetadataPart = z.object({
    "4. Interval": z.string(),
    "5. Output Size": z.string(),
    "6. Time Zone": z.string(),
});

const metaDataIntraday = MetadataBasePart.extend({
    "4. Interval": z.string(),
    "5. Output Size": z.string(),
    "6. Time Zone": z.string(),
});
export type MetadataIntraday = z.infer<typeof metaDataIntraday>;

const metaDataDaily = MetadataBasePart.extend({
    "4. Output Size": z.string(),
    "5. Time Zone": z.string(),
});
export type MetaDataDaily = z.infer<typeof metaDataDaily>;

const metaDataDailyAdjusted = MetadataBasePart.extend({
    "4. Output Size": z.string(),
    "5. Time Zone": z.string()
});
export type MetaDataDailyAdjusted = z.infer<typeof metaDataDailyAdjusted>;

const metaDataWeeklyAndMonthly = MetadataBasePart.extend({
    "4. Time Zone": z.string(),
});
export type MetaDataWeeklyAndMonthly = z.infer<typeof metaDataWeeklyAndMonthly>;

//COMMON TYPE FOR ALL METADATA
export type CommonMetaData = MetadataIntraday | MetaDataDaily | MetaDataDailyAdjusted | MetaDataWeeklyAndMonthly;

const singleDataUnitBase = z.object({
    "1. open": stringAsNumber,
    "2. high": stringAsNumber,
    "3. low": stringAsNumber,
    "4. close": stringAsNumber,
})



export const singleDataUnitDailyIntradayWeeklyAndMonthly = singleDataUnitBase.extend({"5. volume": stringAsNumber})
export type SingleDataUnitDailyIntradayWeeklyAndMonthly = z.infer<typeof singleDataUnitDailyIntradayWeeklyAndMonthly>;



const singleDataUnitDailyAdjustedPart = z.object({
    "5. adjusted close": stringAsNumber,
    "6. volume": stringAsNumber,
    "7. dividend amount": stringAsNumber,
    "8. split coefficient": stringAsNumber,
})

export const singleDataUnitDailyAdjusted = singleDataUnitBase.extend({
    "5. adjusted close": stringAsNumber,
    "6. volume": stringAsNumber,
    "7. dividend amount": stringAsNumber,
    "8. split coefficient": stringAsNumber,
});
export type SingleDataUnitDailyAdjusted = z.infer<typeof singleDataUnitDailyAdjusted>;

export const singleDataUnitWeeklyAdjustedPart = z.object({
    "5. adjusted close": stringAsNumber,
    "6. volume": stringAsNumber,
    "7. dividend amount": stringAsNumber,
})

export const singleDataUnitWeeklyAdjusted = singleDataUnitBase.extend({
    "5. adjusted close": stringAsNumber,
    "6. volume": stringAsNumber,
    "7. dividend amount": stringAsNumber,
});
export type SingleDataUnitWeeklyAdjusted = z.infer<typeof singleDataUnitWeeklyAdjusted>;

const singleDataUnitMonthlyAdjustedPart = z.object({
    "5. adjusted close": stringAsNumber,
    "6. volume": stringAsNumber,
    "7. dividend amount": stringAsNumber,
})

export const singleDataUnitMonthlyAdjusted = singleDataUnitBase.extend({
    "5. adjusted close": stringAsNumber,
    "6. volume": stringAsNumber,
    "7. dividend amount": stringAsNumber,
});
export type SingleDataUnitMonthlyAdjusted = z.infer<typeof singleDataUnitMonthlyAdjusted>;


export const dataEntryNames = z.enum(["Weekly Time Series",
"Monthly Time Series",
"Time Series (Daily)",
"Time Series (5min)",
"Time Series (1min)",
"Time Series (15min)",
"Time Series (30min)",
"Time Series (60min)"])

export enum DATA_ENTRY_NAMES {
    "Weekly Time Series" = "Weekly Time Series",
    "Monthly Time Series" = "Monthly Time Series",
    "Time Series (Daily)" = "Time Series (Daily)",
    "Time Series (5min)" = "Time Series (5min)",
    "Time Series (1min)" = "Time Series (1min)",
    "Time Series (15min)" = "Time Series (15min)",
    "Time Series (30min)" = "Time Series (30min)",
    "Time Series (60min)" = "Time Series (60min)"
}

export type DataEntryNames = z.infer<typeof dataEntryNames>;

//COMMON TYPE FOR ALL TYPES OF DATA FOR SINGLE TIME PERIOD
export const commonDataForSingleTimeUnit = z.union([
    singleDataUnitDailyIntradayWeeklyAndMonthly,
    singleDataUnitDailyAdjusted,
    singleDataUnitWeeklyAdjusted,
    singleDataUnitMonthlyAdjusted])
export const commonMetaDataSchema = z.union([metaDataDaily,metaDataIntraday,metaDataWeeklyAndMonthly,metaDataDailyAdjusted])
export type CommonDataForSingleTimeUnit = z.infer<typeof commonDataForSingleTimeUnit> 

export const stockDataForSingleSymbolDataPart = z.record(z.string(),commonDataForSingleTimeUnit)
export type  StockDataForSingleSymbolDataPart = z.infer<typeof stockDataForSingleSymbolDataPart>;

export const stockDataForSingleSymbolDataPartDeeperObject = z.record(dataEntryNames,stockDataForSingleSymbolDataPart);
export type StockDataForSingleSymbolDataPartDeeperObject = z.infer<typeof stockDataForSingleSymbolDataPartDeeperObject>

export const stockDataForSingleSymbol = z.object({
    "Meta Data":commonMetaDataSchema,
    }).catchall(stockDataForSingleSymbolDataPart);

export type StockDataForSingleSymbol = z.infer<typeof stockDataForSingleSymbol>

export const stockDataApiResponse = z.record(z.string(),stockDataForSingleSymbol)

export type StockDataApiResponse = z.infer<typeof stockDataApiResponse>;


export const symbolListSchema = z.array(z.object({
    symbol:z.string(),
    name:z.string(),
    exchange:z.string(),
    ipoDate: dateSchema,
    assetType:z.string(),
    delistingData: z.optional(z.nullable(z.string())),
    status: z.enum(["Active","Inactive"]),
}))

export type IStockSymbolList = z.infer<typeof symbolListSchema>