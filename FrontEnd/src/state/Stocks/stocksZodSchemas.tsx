import {z} from 'zod';



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

const metaDataIntraday = MetadataBasePart.merge(IntradayMetadataPart);
export type MetadataIntraday = z.infer<typeof metaDataIntraday>;

const DailyMetadataPart = z.object({
    "4. Output Size": z.string(),
    "5. Time Zone": z.string(),
})

const metaDataDaily = MetadataBasePart.merge(DailyMetadataPart);
export type MetaDataDaily = z.infer<typeof metaDataDaily>;

const metaDailyAdjustedPart = z.object({
    "4. Output Size": z.string(),
    "5. Time Zone": z.string()
})

const metaDataDailyAdjusted = metaDailyAdjustedPart.merge(MetadataBasePart);
export type MetaDataDailyAdjusted = z.infer<typeof metaDataDailyAdjusted>;

const metaDataWeeklyAndMonthlyPart = z.object({
    "4. Time Zone": z.string(),
})

const metaDataWeeklyAndMonthly = metaDataWeeklyAndMonthlyPart.merge(MetadataBasePart);
export type MetaDataWeeklyAndMonthly = z.infer<typeof metaDataWeeklyAndMonthly>;

//COMMON TYPE FOR ALL METADATA
export type CommonMetaData = MetadataIntraday | MetaDataDaily | MetaDataDailyAdjusted | MetaDataWeeklyAndMonthly;

const singleDataUnitBase = z.object({
    "1. open": z.number(),
    "2. high": z.number(),
    "3. low": z.number(),
    "4. close": z.number(),
})

const singleDataUnitDailyIntradayWeeklyAndMonthlyPart = z.object({
    "5. volume": z.number()
})

export const singleDataUnitDailyIntradayWeeklyAndMonthly = singleDataUnitDailyIntradayWeeklyAndMonthlyPart.merge(singleDataUnitBase);
export type SingleDataUnitDailyIntradayWeeklyAndMonthly = z.infer<typeof singleDataUnitDailyIntradayWeeklyAndMonthly>;

const singleDataUnitDailyAdjustedPart = z.object({
    "5. adjusted close": z.number(),
    "6. volume": z.number(),
    "7. dividend amount": z.number(),
    "8. split coefficient": z.number(),
})

export const singleDataUnitDailyAdjusted = singleDataUnitBase.merge(singleDataUnitDailyAdjustedPart);
export type SingleDataUnitDailyAdjusted = z.infer<typeof singleDataUnitDailyAdjusted>;

export const singleDataUnitWeeklyAdjustedPart = z.object({
    "5. adjusted close": z.number(),
    "6. volume": z.number(),
    "7. dividend amount": z.number(),
})

export const singleDataUnitWeeklyAdjusted = singleDataUnitWeeklyAdjustedPart.merge(singleDataUnitBase);
export type SingleDataUnitWeeklyAdjusted = z.infer<typeof singleDataUnitWeeklyAdjusted>;

const singleDataUnitMonthlyAdjustedPart = z.object({
    "5. adjusted close": z.number(),
    "6. volume": z.number(),
    "7. dividend amount": z.number(),
})

export const singleDataUnitMonthlyAdjusted = singleDataUnitMonthlyAdjustedPart.merge(singleDataUnitBase);
export type SingleDataUnitMonthlyAdjusted = z.infer<typeof singleDataUnitMonthlyAdjusted>;

//COMMON TYPE FOR ALL TYPES OF DATA FOR SINGLE TIME PERIOD
export type CommonDataForSingleTimeUnit = SingleDataUnitDailyIntradayWeeklyAndMonthly | SingleDataUnitDailyAdjusted | SingleDataUnitWeeklyAdjusted | SingleDataUnitMonthlyAdjusted;

export const stockDataForSingleSymbol = z.object({
    "Meta Data":z.union([metaDataDaily,metaDataIntraday,metaDataWeeklyAndMonthly,metaDataDailyAdjusted]),
    functionName: 
    z.record(
        z.enum(["Weekly Time Series",
                "Monthly Time Series",
                "Time Series (Daily)",
                "Time Series (5min)",
                "Time Series (1min)",
                "Time Series (15min)",
                "Time Series (30min)",
                "Time Series (60min)"],
        z.array(
            z.record(z.date(),z.union([singleDataUnitDailyIntradayWeeklyAndMonthly,
                singleDataUnitDailyAdjusted,
                singleDataUnitWeeklyAdjusted,
                singleDataUnitMonthlyAdjusted])
        )))),
});

export type StockDataForSingleSymbol = z.infer<typeof stockDataForSingleSymbol>

export const stockDataApiResponse = z.record(z.string(),stockDataForSingleSymbol)

export type StockDataApiResponse = z.infer<typeof stockDataApiResponse>;



export const stockDataSchema= z.object({
    "Meta Data":z.object({
        "1. Information":z.string(),
        "2. Symbol":z.string(),
        "3. Last Refreshed":z.date(),
        "4. Output Size":z.string(),
        "5. Time Zone":z.string(),
    }),
    functionName:z.record(z.enum(["Weekly Time Series",
    "Monthly Time Series",
    "Time Series (Daily)",
    "Time Series (5min)",
    "Time Series (1min)",
    "Time Series (15min)",
    "Time Series (30min)",
    "Time Series (60min)"]),z.array(
        z.record(
            z.date(),z.object(
                {
        "1. open": z.number(),
            "2. high": z.number(),
            "3. low": z.number(),
            "4. close": z.number(),
            "5. volume": z.number()
    }))))
});

export type IStockDataType = z.infer<typeof stockDataSchema>;

const dateSchema = z.preprocess((arg) => {
    if(typeof arg == "string" || arg instanceof Date) return new Date(arg);
},z.date());
type dateOrString = z.infer<typeof dateSchema>;

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