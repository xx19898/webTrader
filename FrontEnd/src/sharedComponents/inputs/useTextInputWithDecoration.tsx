import gsap from "gsap"
import { Linear } from "gsap/src/all"
import { useEffect, useRef, useState } from "react"

export default ({value}:{value:string}) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const placeholderRef = useRef<HTMLDivElement>(null)

    const [focused,setFocused] = useState(false)
    const [tl] = useState(gsap.timeline())

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
        {
            wrapperRef: wrapperRef,
            inputRef:inputRef,
            placeholderRef: placeholderRef,
            onFocus:onFocus
        }
    )
}