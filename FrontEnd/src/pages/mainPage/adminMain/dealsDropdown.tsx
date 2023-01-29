import { useState,useRef } from "react"
import useAnimatedDropdown from "./useAnimatedDropdown"

interface IDealsDropdown{
    name:string,
    deals:{
        stockName:string,
        quantity:number,
        totalPrice:number,
        priceOfStock:number
    }[]
}
export default ({name,deals}:IDealsDropdown) => {

    const dropdownRef = useRef<HTMLUListElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef})
    
    return(
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
                            </section>
                            <button className="my-6 p-2 px-8 rounded-sm bg-primary">
                                APPROVE
                            </button>
                            //TODO: implement approving the deal and answering the messages, build the backend accordingly
                        </li>
                    )
                })}
            </ul>
            :
            null
        }
        </div>
    )
}