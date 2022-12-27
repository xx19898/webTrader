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
            duration:0,
            width: 'fit-content',
            left: '15%'
        }).to(placeholderRef.current,{
            duration: 0.1,
            x: '-1em',
            y: '-1.3em',
            yoyo: true,
            ease: Linear.easeIn
        }).to(placeholderRef.current,{
            duration: 0,
            background:'white'
        }).to(placeholderRef.current,{
            duration: 0.1,
            paddingLeft: '1rem',
            paddingRight: '1rem',
            ease: Linear.easeIn,
        })
    },[])

    useEffect(() => {
        if(focused && value.trim().length != 0){
            setFocusOnInput()
        }
    },[focused])

    useEffect(() => {
        console.log({value:value.length})
        console.log({focused})
        if(value.length != 0 && focused === false){
            console.log("RIGHT! " + value );
            
            tl.play()
        }
    },[value])
    
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
            onFocus:onFocus,
        }
    )
}