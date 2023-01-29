import { useState,useEffect,useRef, useLayoutEffect, useMemo } from "react"
import {gsap} from "gsap"
import useAnimatedDropdown from "./useAnimatedDropdown"

interface IMessageDropdown{
    name:string,
    messages: {
        message:string,
        date:Date,
    }[],
}

export default ({name,messages}:IMessageDropdown) => {
    
    const dropdownRef = useRef<HTMLUListElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef})
    

    return(
        <div className="flex flex-col justify-center items-center w-auto h-auto gap-0">
            <div className = {open ? "w-full bg-primary py-[1rem] px-[2rem] first:mt-6  mt-3 h-[2rem] border-solid border-darker-secondary-2 cursor-pointer flex justify-center items-center" : "w-full border border-solid border-darker-secondary-2 py-[1rem] px-[2rem] first:mt-6  mt-3 h-[2rem] cursor-pointer flex justify-center items-center"}  onClick={() => handleClick()}>
                <h2>{name}</h2>
            </div>
            {
                open 
                ?
                <ul className="bg-secondary-2 w-full h-auto flex flex-col justify-start align-center border-solid border border-darker-secondary-2" ref={dropdownRef}>
                    {messages.map(message => {
                        return(
                            <li className=" bg-primary p-4 text-center min-w-fit w-[60%] ml-[2rem] mr-2 rounded-md my-4 flex flex-col justify-center items-center">
                                <p className="font-normal">{message.message}</p>
                                <i className="relative left-7 text-sm font-light">
                                    {message.date.toLocaleString() }
                                </i>
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