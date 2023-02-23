import { useState,useEffect,useRef, useLayoutEffect, useMemo } from "react"
import {gsap} from "gsap"
import useAnimatedDropdown from "./useAnimatedDropdown"
import SendIcon from "../../../icons/sendIcon"

export type Message = {
    message:string,
    date:Date,
    id: number
}

interface IMessageDropdown{
    name:string,
    messages:Message[],
}
//TODO: implement sending and responding to messages + test the sendIcon functionality, implement both visual and functional replying functionality
export default ({name,messages}:IMessageDropdown) => {
    
    const dropdownRef = useRef<HTMLUListElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef})
    const [typedMessage,setTypedMessage] = useState<string>("")    

    return(
        <div className="flex flex-col justify-center items-center w-full h-auto gap-0">
            <div className = {open ? "w-[60%] bg-primary py-[1rem]  mt-3 h-[2rem] border-solid border-darker-secondary-2 cursor-pointer flex justify-center items-center" : "w-[60%] border border-solid border-darker-secondary-2 py-[1rem] first:mt-6  mt-3 h-[2rem] cursor-pointer flex justify-center items-center"}  onClick={() => handleClick()}>
                <h2 className="text-white font-semibold">{name}</h2>
            </div>
            {
                open 
                ?
                <section>
                <ul className="bg-secondary-2 w-full h-auto flex flex-col justify-start align-center border-solid border border-darker-secondary-2" ref={dropdownRef}>
                    {messages.map(message => {
                        return(
                            <li className=" bg-primary p-4 text-center w-[60%] ml-[2rem] mr-2 rounded-md my-4 flex flex-col justify-center items-center">
                                <p className="font-normal text-white">{message.message}</p>
                                <i className="relative left-7 text-sm font-light">
                                    {message.date.toLocaleString() }
                                </i>
                            </li>
                        )
                    })}
                    <li className="block mx-auto relative w-[60%]">
                    <input type='textarea' className="block h-min-20 w-full mx-auto h-10 indent-4 pr-6 focus:outline-none" onChange={(e) => setTypedMessage(e.target.value)}></input>
                    <div className="absolute right-2 top-1">
                    <SendIcon callback={() => SendMessage(typedMessage)} height={30}  />
                    </div>
                    </li>
                </ul>
                </section> 
                :
                null
            }
        </div>
    )

    function SendMessage(message:string){
        if(message.length != 0){
            console.log(message)
        }
    }
    function replyToMessage(message:string){

    }
}