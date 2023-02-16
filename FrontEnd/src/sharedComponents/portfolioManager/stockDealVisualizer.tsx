import axios from "axios"
import { access } from "fs"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { z } from "zod"
import { BASE_URL } from "../../constants/urls"
import RedCrossIcon from "../../icons/redCrossIcon"
import { useAppSelector } from "../../reduxHooks"
import { UPDATE_STOCK_DEALS } from "../../state/Users/usersActionTypes"

export const stockDealSchema = z.object({
    id: z.number(),
    symbol: z.string(),
    dealStatus: z.enum(['PENDING','APPROVED','DISAPPROVED','CANCELLED']),
    quantity: z.number(),
    price: z.number(),
    operationType: z.enum(['BUY','SELL']),
})

export const stockDealsSchema = z.array(stockDealSchema)
export type StockDeals = z.infer<typeof stockDealsSchema>

export type StockDeal = z.infer<typeof stockDealSchema>

const stockDealMockData: StockDeal[] = [{
    symbol: "AAPL",
    dealStatus: 'PENDING',
    operationType: 'BUY',
    price: 415.5,
    quantity:2,
    id:1
},
{
    id: 2,
    symbol:"GGL",
    operationType:"BUY",
    price: 245.23,
    quantity: 3,
    dealStatus: 'APPROVED', 
}
]

export default () => {
    const stockDeals = useAppSelector(state => state.users.stockDeals)
    const reduxDispatch = useDispatch()
    const accessToken = useAppSelector(state => state.users.accessToken)
    useEffect(() => {
        reduxDispatch({type:UPDATE_STOCK_DEALS})
    },[])

    return(
        <>
        <h3 className="text-center font-bold text-lg text-white mb-5">Stock Deals</h3>
        <div>
            {
                (stockDeals === undefined || stockDeals.length === 0) ? <label className="text-center text-white">You do not have any stock deals</label>
                :
                <ul className="w-full">
                {
                    stockDeals.map(stockDeal => {
                        return(
                        <li className="h-auto w-full my-6 py-2 bg-darker-secondary-2">
                            {
                            stockDeal.dealStatus != 'CANCELLED' ? 
                            <div className="h-[30px] flex justify-end items-center">
                            <button className="m-6" onClick={() => cancelStockDeal(stockDeal.id,accessToken as string)}>
                                <RedCrossIcon height={20} />
                            </button>
                            </div>
                            :
                            null
                            }
                            <div className="grid grid-cols-2 text-center">
                            <h2 className="text-white">Symbol</h2> <p className="text-white font-semibold">{stockDeal.symbol}</p>
                            <h2 className="text-white">Price</h2> <p className="text-white font-semibold">{stockDeal.price}</p> 
                            <h2 className="text-white">Quantity</h2> <p className="text-white font-semibold">{stockDeal.quantity}</p>
                            <h2 className="text-white">Operation type</h2> <p className="text-white font-semibold">{stockDeal.operationType}</p>
                            <h2 className="text-white">Deal Status</h2><p className="text-white font-semibold">{stockDeal.dealStatus}</p>
                            </div>
                        </li>
                    )})
                }
                </ul>
            }
        </div>
        </>
    )

    function cancelStockDeal(stockDealId:number,accessToken:string){
            return axios({
                method: 'patch',
                headers:{
                    Authorisation: accessToken,
                },
                data:{
                    stockDealId: stockDealId,
                },
                withCredentials: true,
                url: BASE_URL + 'users/cancelStockDeal'
            })
    }
}