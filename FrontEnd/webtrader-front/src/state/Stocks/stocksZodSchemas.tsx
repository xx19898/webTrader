import {z} from 'zod';

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
    "Time Series (60min)"]),z.array(z.record(z.date(),z.object({
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