import { useState,useRef } from "react"
import { trackPromise, usePromiseTracker } from "react-promise-tracker"
import { DropDownArrowIcon } from "../../../icons/dropdownArrowIcon"
import { DealStatus } from "../../../sharedComponents/portfolioManager/portfolioDataSchemas"
import { StockDeals } from "../../../sharedComponents/portfolioManager/stockDealVisualizer"
import GsapPreloader from "../../../sharedComponents/preloaders/gsapPreloader"
import useAnimatedDropdown from "./useAnimatedDropdown"
import useDealsDropdown from "./useDealsDropdown"

interface IDealsDropdown{
    name:string,
    deals:StockDeals
}

export default ({name,deals}:IDealsDropdown) => {

    const dropdownRef = useRef<HTMLUListElement>(null)
    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef,dropdownArrowRef})
    const {handleChangeDealStatus} = useDealsDropdown();
    const dealStatusChangeProgress = usePromiseTracker();
    
    return (
        <GsapPreloader
        dataIsLoaded={!dealStatusChangeProgress.promiseInProgress}
        underlyingComponent={
            <div className="w-full flex flex-col justify-start items-center">
        <div className={
        open 
        ?
        "flex flex-col justify-center items-center h-auto w-[40%] mt-3 border border-solid border-darker-secondary-2 cursor-pointer p-2 text-center bg-primary"
        :
        "flex flex-col justify-center items-center h-auto mt-3 w-[40%] border border-solid border-darker-secondary-2 cursor-pointer py-1 text-center"  } onClick={() => handleClick()}>
            <span className="text-white font-semibold mb-1">{name}</span>
            <DropDownArrowIcon height={10} ref={dropdownArrowRef} />
        </div>
        {
            open ? 
            <ul className="w-[80%] flex flex-col justify-center items-center " ref={dropdownRef}>
                {deals.map(deal => {
                    return(
                        <li className="w-full px-8 py-2 flex flex-col justify-center items-center ">
                            <header className="my-2 font-bold"><h2>{deal.symbol}</h2></header>
                            <section className="w-full grid grid-cols-2 text-white">
                                <p className="text-center font-semibold text-white">quantity:</p>
                                <p className="text-center font-semibold text-white">{deal.quantity}</p>
                                <p className="text-center font-semibold text-white">Price</p>
                                <p className="text-center font-semibold text-white">{deal.stockPriceAtTheAcquirement}</p> 
                                <p className="text-center font-semibold text-white">Total Price</p>
                                <p className="text-center font-semibold text-white">{deal.stockPriceAtTheAcquirement * deal.quantity}</p>
                                <p className="text-center font-semibold text-white">STATUS</p>
                                <p className="text-center font-bold">{deal.dealStatus}</p>
                            </section>
                            <section>
                            <section className="flex flex-row justify-center items-center">
                            <button className="my-6 p-2 mr-10 px-8 rounded-sm bg-primary" onClick={() => trackPromise(handleChangeDealStatus({id:deal.id,newStatus:"APPROVED"}))}>
                                APPROVE
                            </button>
                            <button className="my-6 p-2 px-6 rounded-sm bg-primary" onClick={() => trackPromise(handleChangeDealStatus({id:deal.id,newStatus:"DISAPPROVED"}))}>
                                DISAPPROVE
                            </button>
                            </section>
                            </section>
                            //TODO: implement approving the deal and answering the messages, build the backend accordingly
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
}