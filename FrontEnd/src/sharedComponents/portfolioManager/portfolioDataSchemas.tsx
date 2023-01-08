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