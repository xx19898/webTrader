import { z } from "zod"

const stockDeal = z.object({
    quantity: z.number(),
    symbol:z.string(),
    stockPriceAtTheAcquirement: z.number(),
    dealStatus: z.enum(['APPROVED','DISAPPROVED','CANCELLED','PENDING']),
    operationType: z.enum(['BUY','SELL']),
    createdDate: z.string().pipe( z.coerce.date() ),
    id: z.number(),
    ownerName: z.string(),
    userId: z.number(),
})

export type StockDeal = z.infer<typeof stockDeal>

export const portfolioStock = z.object({
    userId: z.number(),
    symbol: z.string(),
    portfolioId: z.number(),
    priceAtAcquirement: z.number(),
    quantity: z.number(),
})

export type PortfolioStock = z.infer<typeof portfolioStock>

export const portfolio = z.object({
    id: z.number(),
    portfolioStocks: z.array(portfolioStock),
    ownerId: z.number(),
    balance: z.number(),
})

export type Portfolio = z.infer<typeof portfolio>

export const userInfo = z.object({
    id: z.number(),
    username: z.string(),
    portfolio: z.nullable(portfolio),
    stockDeals: z.array(stockDeal),
})

export type UserInfo = z.infer<typeof userInfo>

export const getUserInfoApiResponse = z.array(userInfo)

export type GetUserInfoApiResponse = z.infer<typeof getUserInfoApiResponse>