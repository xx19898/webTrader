import { wrap } from "module";
import { useEffect, useRef, useState } from "react";


const UseDropDownMenu = () => {
    const [open,setOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null);


    const handleClickOutside = (event: Event) => {
        if(
            wrapperRef.current && 
            !wrapperRef.current.contains(event.target as Node)
        ){
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click',handleClickOutside, true)
        return () => {
            document.removeEventListener('click',handleClickOutside, true)
        }
    })

    return({
        open: open,
        setOpen: setOpen,

        wrapperRef: wrapperRef,
        
    })
    

}

export default UseDropDownMenu;