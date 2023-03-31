import axios from "axios"
import { useState,useRef } from "react"
import { trackPromise, usePromiseTracker } from "react-promise-tracker"
import { BASE_URL } from "../../../constants/urls"
import { DropDownArrowIcon } from "../../../icons/dropdownArrowIcon"
import { useAppDispatch, useAppSelector } from "../../../reduxHooks"
import { DealStatus } from "../../../sharedComponents/portfolioManager/portfolioDataSchemas"
import { StockDeals } from "../../../sharedComponents/portfolioManager/stockDealVisualizer"
import GsapPreloader from "../../../sharedComponents/preloaders/gsapPreloader"
import { StockDeal } from "./adminMainPageSchema"
import useAnimatedDropdown from "./useAnimatedDropdown"
import useDealsDropdown from "./useDealsDropdown"

interface IDealsDropdown{
    name:string,
    deals:StockDeal[]
}

export default ({name,deals}:IDealsDropdown) => {
    const reduxDispatch = useAppDispatch()
    const dropdownRef = useRef<HTMLUListElement>(null)
    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef,dropdownArrowRef})
    const dealStatusChangeProgress = usePromiseTracker();
    const accessToken = useAppSelector(state => state.users.accessToken) as string
    
    return (
        <GsapPreloader
        dataIsLoaded={!dealStatusChangeProgress.promiseInProgress}
        underlyingComponent={
            <div className="w-full flex flex-col justify-start items-center">
        <div className={
        open 
        ?
        "flex flex-col justify-center items-center h-auto w-[40%] mt-3 border border-solid border-darker-secondary-2 cursor-pointer p-2 text-center bg-primary rounded-[17px]"
        :
        "flex flex-col justify-center items-center h-auto mt-3 w-[40%] border border-solid border-darker-secondary-2 cursor-pointer py-1 text-center rounded-[17px]"  } onClick={() => handleClick()}>
            <span className="text-white font-semibold mb-1">Stock Deals</span>
            <DropDownArrowIcon onClickCallback={handleClick} height={10} ref={dropdownArrowRef} />
        </div>
        {
            open ? 
            <ul className="w-full flex flex-col justify-center items-center " ref={dropdownRef}>
                {
                deals.map(deal => {
                    return(
                        <li className="w-[80%] first:mt-[40px] last:mb-[40px] my-[10px] flex flex-col justify-center items-center bg-gradient-to-tr from-secondary to-secondary-2 rounded-[17px] drop-shadow-md">
                            <h2 className="text-white my-[40px] font-medium text-[36px]">{deal.symbol}</h2>
                            <section className="w-full grid grid-cols-2 gap-y-[20px] text-white py-0 my-0">
                                <p className="text-center font-normal text-[18px] text-white">Operation type:</p>
                                <p className="text-center font-medium  text-white">{deal.operationType}</p>
                                <p className="text-center font-normal text-[18px] text-white">Quantity:</p>
                                <p className="text-center font-medium  text-white">{deal.quantity}</p>
                                <p className="text-center font-normal text-[18px] text-white">Price</p>
                                <p className="text-center font-medium  text-white">{deal.stockPriceAtTheAcquirement}</p> 
                                <p className="text-center font-normal text-[18px] text-white">Total Price</p>
                                <p className="text-center font-medium  text-white">{deal.stockPriceAtTheAcquirement * deal.quantity}</p>
                                <p className="text-center font-normal text-[18px] text-white">STATUS</p>
                                <p className={`text-center font-medium ${deal.dealStatus !== "PENDING" ? 'mb-[40px]': null}`}>{deal.dealStatus}</p>
                                {
                                    deal.dealStatus === "PENDING" ?
                                    <>
                                    <button className="col-start-1 p-2 mx-4  px-8 mb-[40px] rounded-[17px] font-normal bg-primary text-white" onClick={() => trackPromise(handleChangeStockDealStatus({accessToken:accessToken,stockDealId:deal.id,newStatus:true}))}>
                                        APPROVE
                                    </button>
                                    <button className="col-start-2 p-2 mx-4 px-6 mb-[40px]  rounded-[17px] font-normal bg-primary text-white" onClick={() => trackPromise(handleChangeStockDealStatus({accessToken:accessToken,stockDealId:deal.id,newStatus:false}))}>
                                        DISAPPROVE
                                    </button>
                                    </>
                                    :
                                    null
                                }
                            </section>
                        </li>
                    )
                })}
            </ul>
            :
            null
        }
        </div>
        }/>
    )

    async function handleChangeStockDealStatus({accessToken,newStatus,stockDealId}:{accessToken:string,newStatus:boolean,stockDealId:number}){
        const response = await axios({
            method:'patch',
            withCredentials:true,
            url: BASE_URL + 'admin/changeDealStatus',
            data:{
                newStatus: newStatus ? 'APPROVED' : 'DISAPPROVED',
                id: stockDealId
            },
            headers:{
                Authorization: accessToken
            }
        })

        console.log("GOT TO BEFORE DISPATCH")
        reduxDispatch({type:'UPDATE_USER_DATA'})
        console.log("GOT TO AFTER DISPATCH")
    }
}