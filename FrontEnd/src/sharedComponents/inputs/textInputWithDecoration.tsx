import gsap, { Bounce, Elastic } from "gsap";
import EasePack from "gsap/EasePack";
import { Expo } from "gsap/src";
import { Linear } from "gsap/src/all";
import { useEffect, useRef, useState } from "react";
import useTextInputWithDecoration from "./useTextInputWithDecoration";

interface IInputWithDecoration{
    name:string
    value:string,
    setValue: (event:React.ChangeEvent<HTMLInputElement>) => void
}

export default ({name,value,setValue}:IInputWithDecoration) => {
    const {wrapperRef,inputRef,placeholderRef,onFocus} = useTextInputWithDecoration({value:value})

    return(
        <>
        <div ref={wrapperRef} className="w-auto h-auto flex justify-center align-center text-center">
        <div className="relative text-center">
        <input
        ref={inputRef}
        name={name}
        type={name === 'password' ? 'password' : 'text'}
        onFocus={(e) => onFocus()}
        onChange={(e) => setValue(e)}
        value={value}
        className=" bg-white px-4 placeholder:italic placeholder:text-black/50 mt-1 rounded-sm w-full h-10 border-solid border-primary border-[3px]"/>
        <div ref={placeholderRef} className="absolute z-4 p-0 w-full left-0 bottom-[0.5rem] text-gray-900 bg-transparent">{name.toUpperCase()}</div>
        </div>
        </div>
        </>
    )
}