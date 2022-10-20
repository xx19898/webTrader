import { useEffect, useRef, useState } from "react";

export default () => {
    const [open,setStatusOfDropdown] = useState(false)
    const [chosenElement,setChosenElement] = useState("")
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if(event.key === 'Escape'){
            setStatusOfDropdown(false)
        }
    }

    const handleClickOutside = (event: Event) => {
        if(
            wrapperRef.current && 
            !wrapperRef.current.contains(event.target as Node)
        ){
            setStatusOfDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown',handleHideDropdown, true)
        document.addEventListener('click',handleClickOutside, true)
        return () => {
            document.addEventListener('keydown',handleHideDropdown, true)
            document.addEventListener('click',handleClickOutside, true)
        }
    })

    function clickArrowButton(){
        open === true ? setStatusOfDropdown(false) : setStatusOfDropdown(true)
    }
    return({
        dropDownStatus: open,
        setStatusOfDropdown: setStatusOfDropdown,
        chosenElement: chosenElement,
        setChosenElement: setChosenElement,
        dropdownRef: wrapperRef,
        clickArrowButton: clickArrowButton,
    })
}