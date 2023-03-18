import { useState,useEffect,useRef, useLayoutEffect, useMemo } from "react"
import {gsap} from "gsap"
import useAnimatedDropdown from "./useAnimatedDropdown"
import SendIcon from "../../../icons/sendIcon"
import Chat, { IMessageDropdown } from "../../../sharedComponents/chat/chat"
import { DropDownArrowIcon } from "../../../icons/dropdownArrowIcon"


//TODO: implement sending and responding to messages + test the sendIcon functionality, implement functional replying functionality
export default ({otherUser,messages,conversationId}:IMessageDropdown) => {
    
    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const dropdownRef = useRef<HTMLElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef,dropdownArrowRef})
    
    


    return(
        <div className="flex flex-col justify-center items-center w-full h-auto">
            <div
            className = {
                open ? 
                "flex justify-center items-center flex-col w-[40%] h-auto py-1 bg-primary  mt-3 border-solid border-darker-secondary-2 cursor-pointer" 
                :
                "w-[40%] border border-solid border-darker-secondary-2  py-1 first:mt-6  mt-3 h-auto cursor-pointer flex justify-center items-center flex-col"}  onClick={() => handleClick()}>
                <h2 className="text-white font-bold text-lg mb-1">{otherUser}</h2>
                <DropDownArrowIcon onClickCallback={handleClick} height={10} ref={dropdownArrowRef} />
            </div>
            {
                open 
                ?
                <section ref={dropdownRef}>
                    <Chat messages={messages} otherUser={otherUser} conversationId={conversationId}/>
                </section> 
                :
                null
            }
        </div>
    )
}