import { useState,useRef } from "react"
import { trackPromise, usePromiseTracker } from "react-promise-tracker"
import GsapPreloader from "../../../sharedComponents/preloaders/gsapPreloader"
import useAnimatedDropdown from "./useAnimatedDropdown"
import useDealsDropdown from "./useDealsDropdown"

interface IDealsDropdown{
    name:string,
    deals:{
        id: number,
        stockName:string,
        status: 'APPROVED' | 'DISAPPROVED' | 'PENDING'
        quantity:number,
        totalPrice:number,
        priceOfStock:number
    }[]
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

            <div className=" flex flex-col justify-start items-center">
        <div className={ open ? "h-[2rem] mt-3 border border-solid border-darker-secondary-2 cursor-pointer w-full text-center bg-primary" : "h-[2rem] mt-3 border border-solid border-darker-secondary-2 cursor-pointer w-full text-center"  } onClick={() => handleClick()}>
            {name}
        </div>
        {
            open ? 
            <ul className="w-full flex flex-col justify-center items-center border border-solid border-darker-secondary-2" ref={dropdownRef}>
                {deals.map(deal => {
                    return(

                        <li className="w-full px-8 py-2 flex flex-col justify-center items-center ">
                            <header className="my-2 font-bold"><h2>{deal.stockName}</h2></header>
                            <section className="w-full grid grid-cols-2">
                                <p className="text-center font-semibold">quantity:</p>
                                <p className="text-center font-semibold">{deal.quantity}</p>
                                <p className="text-center font-semibold">Price</p>
                                <p className="text-center font-semibold">{deal.priceOfStock}</p> 
                                <p className="text-center font-semibold">Total Price</p>
                                <p className="text-center font-semibold">{deal.totalPrice}</p>
                                <p className="text-center font-semibold">STATUS</p>
                                <p className="text-center font-bold">{deal.status}</p>
                            </section>
                            <section>
                            <button className="my-6 p-2 px-8 rounded-sm bg-primary" onClick={() => trackPromise(handleChangeDealStatus({id:deal.id,newStatus:"APPROVED"}))}>
                                APPROVE
                            </button>
                            <button className="my-6 p-2 px-8 rounded-sm bg-primary" onClick={() => trackPromise(handleChangeDealStatus({id:deal.id,newStatus:"DISAPPROVED"}))}>
                                DISAPPROVE
                            </button>
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