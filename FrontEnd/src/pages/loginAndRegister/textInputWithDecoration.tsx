import gsap, { Bounce, Elastic } from "gsap";
import EasePack from "gsap/EasePack";
import { Expo } from "gsap/src";
import { Linear } from "gsap/src/all";
import { useEffect, useRef, useState } from "react";

interface IInputWithDecoration{
    placeholder:string,
    value:string,
    setValue: (newValue:string) => void
}

export default ({placeholder,value,setValue}:IInputWithDecoration) => {
    'const [focused,setFocused,value,setValue,tl,wrapperRef,inputRef,placeholder]'

    const [focused,setFocused] = useState(false)
    const [tl] = useState(gsap.timeline())

    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const placeholderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        tl.to(placeholderRef.current,{
            duration: 0.2,
            x: '1em',
            y: '-1.3em',
            width: 'fit-content',
            yoyo: true,
            ease: Linear.easeNone
        }).to(placeholderRef.current,{
            duration: 0.1,
            paddingLeft: '0.5em',
            paddingRight: '0.5em',
            ease: Linear.easeIn,
        })
    },[])

    useEffect(() => {
        if(focused && value.trim().length != 0){
            setFocusOnInput()
        }
    },[focused])
    
    useEffect(() => {
        tl.reversed(!focused)
    },[focused])

    const setFocusOnInput = () => {inputRef.current && inputRef.current.focus()}

    const onFocus = () => {    
            setFocused(true)
            setFocusOnInput()
    }

    let onUnfocus = () => {
            if(value.trim().length === 0){
                setFocused(false)
            }
    }

    const onChangeOfInput = (event: React.FormEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value
        setValue(newValue)
    }
 
    useEffect(() => {
        const handleClickOutside = (event:Event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)){
                onUnfocus()
            }else{
                onFocus()
            }}
    document.addEventListener('click',handleClickOutside)
    return () => {
        document.removeEventListener('click',handleClickOutside)
    }
    }, [wrapperRef,value])

    return(
        <>
        <div ref={wrapperRef} className="w-auto h-auto flex justify-center align-center text-center">
        <div className="relative text-center">
        <input
        ref={inputRef}
        name={placeholder}
        type={placeholder === 'PASSWORD' ? 'password' : 'text'}
        onFocus={(e) => onFocus()}
        onChange={(e) => setValue(e.currentTarget.value)}
        value={value}
        className=" bg-white px-4 placeholder:italic placeholder:text-black/50 mt-1 rounded-sm w-full h-10 border-solid border-primary border-[3px]"/>
        <div ref={placeholderRef} className="absolute z-4 p-0 w-full left-0 bottom-[0.5rem] text-gray-900 bg-transparent">{placeholder}</div>
        </div>
        </div>
        </>
    )
}