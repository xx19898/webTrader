import { useEffect, useRef, useState } from "react";

interface IInputWithDecoration{
    text:string,
}

export default ({text}:IInputWithDecoration) => {
    const [focused,setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClickOutside = (event:Event) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)){
                setFocused(false)
            }
    }
    document.addEventListener('click',handleClickOutside, true)
    return () => {

    }
}, []) 

    return(
        <>
        {
            focused 
            ?
            <div className="flex flex-row flex-nowrap content-between items-stretch content-center">
            <span className=" bg-black h-[2px] mt-4 rounded-md flex-1 flex-grow-0"></span>
            <span className="flex-1">{text}</span>
            <span className="bg-black h-[2px] mt-4 rounded-md w-auto flex-9"></span>
            </div>
            :
            <div className="bg-black w-auto h-[2px] mt-4 rounded-md"></div>
        }
        <input 
        ref={inputRef}
        type="text"
        placeholder={focused ? "" : text}
        onFocus={() => setFocused(true)}
        className="pl-4 bg-white placeholder:italic placeholder:text-black/50 placeholder:mx-auto placeholder:text-center mt-1 rounded-sm w-full h-10"/>
        </>
    )
}