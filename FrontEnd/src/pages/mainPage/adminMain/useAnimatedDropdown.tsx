import gsap from "gsap"
import { useEffect, useRef, useState } from "react"


export default ({dropdownRef}:{dropdownRef:React.RefObject<HTMLUListElement>}) => {
    const [open,setOpen] = useState(false)
    const timeline = useRef( gsap.timeline({paused:true,onComplete:() => setOpen(false)}))
    

    useEffect(() => {
        if (open) gsap.fromTo(dropdownRef.current,{
            opacity:0,
            height:0,
        },{
            height:"auto",
            opacity:1,
            duration:0.5,
        })
    },[open])

    function handleClick(){
        if(open){
            handleClose()
        }else{
            setOpen(true)
        }
    }

    function handleClose(){
        console.log("closing")
        console.log(timeline.current.totalDuration())
        gsap.to(dropdownRef.current,{duration:0.5,height:0})
        gsap.to(dropdownRef.current,{duration:0.3,opacity:0}).eventCallback("onComplete",() => setOpen(false))
    }

    return {
        handleClick: handleClick,
        open:open
    }
}