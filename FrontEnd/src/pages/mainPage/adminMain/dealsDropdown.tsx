import { useState,useRef } from "react"
import { trackPromise, usePromiseTracker } from "react-promise-tracker"
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
    const {open,handleClick} = useAnimatedDropdown({dropdownRef})
    const {handleChangeDealStatus} = useDealsDropdown();
    const dealStatusChangeProgress = usePromiseTracker();
    
    return (
        <GsapPreloader
        dataIsLoaded={!dealStatusChangeProgress.promiseInProgress}
        underlyingComponent={

            <div className="w-full flex flex-col justify-start items-center">
        <div className={ open ? "flex justify-center items-center h-[2rem] w-[60%] mt-3 border border-solid border-darker-secondary-2 cursor-pointer p-2 text-center bg-primary" : "flex justify-center items-center h-[2rem] mt-3 w-[60%] border border-solid border-darker-secondary-2 cursor-pointer py-2 text-center"  } onClick={() => handleClick()}>
            <span className="text-white font-semibold">{name}</span>
        </div>
        {
            open ? 
            <ul className="w-full flex flex-col justify-center items-center border border-solid border-darker-secondary-2" ref={dropdownRef}>
                {deals.map(deal => {
                    return(

                        <li className="w-full px-8 py-2 flex flex-col justify-center items-center ">
                            <header className="my-2 font-bold"><h2>{deal.symbol}</h2></header>
                            <section className="w-full grid grid-cols-2">
                                <p className="text-center font-semibold">quantity:</p>
                                <p className="text-center font-semibold">{deal.quantity}</p>
                                <p className="text-center font-semibold">Price</p>
                                <p className="text-center font-semibold">{deal.stockPriceAtTheAcquirement}</p> 
                                <p className="text-center font-semibold">Total Price</p>
                                <p className="text-center font-semibold">{deal.stockPriceAtTheAcquirement * deal.quantity}</p>
                                <p className="text-center font-semibold">STATUS</p>
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