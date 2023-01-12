import { z } from "zod"

const stockInPortfolio = z.object({
                  name:z.string(),
                  quantity: z.number(),
                  dateOfAcquisition: z.date(),
                  priceOfAcquisition: z.number(),
                }) 
                
export type StockInPortfolio = z.infer<typeof stockInPortfolio>

const portfolioSchema = z.object({
    balance:z.number(),
    stocksInPortfolio:z.array(
        stockInPortfolio
    )})

export type Portfolio = z.infer<typeof portfolioSchema>

export {portfolioSchema}

const x = {"data":
    [{
      "c":["1","24","12"],"p":133.55,"s":"AAPL","t":1673521938710,"v":10
    },{
      "c":["1","24","12"],"p":133.55,"s":"AAPL","t":1673521938710,"v":10
    },{
      "c":["1","8","24","12"],"p":133.55,"s":"AAPL","t":1673521938710,"v":33
    }],
    "type":"trade"}

const singleDataEntry = z.object({
    "c":z.array(z.preprocess(val => Number(val),z.number())),
    "p":z.number(),
    "s":z.string(),
    "t":z.number(),
    "v":z.number(),
})

const stockPriceData = z.object({
    "data":z.array(singleDataEntry),
    "type":z.string()
})

export {stockPriceData}
export type StockPriceData = z.infer<typeof stockPriceData>

