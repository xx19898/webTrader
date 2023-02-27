import gsap from "gsap"
import { Power1 } from "gsap/gsap-core"
import { useEffect, useRef, useState } from "react"


export default ({dropdownRef,dropdownArrowRef}:{dropdownRef:React.RefObject<HTMLElement>,dropdownArrowRef:React.RefObject<SVGSVGElement>}) => {
    const [open,setOpen] = useState(false)
    const timeline = useRef( gsap.timeline({paused:true,onComplete:() => setOpen(false)}))
    

    useEffect(() => {
        if (open){ gsap.fromTo(dropdownRef.current,{
            opacity:0,
            height:0,
        },{
            height:"auto",
            opacity:1,
            duration:0.5,
        })
        gsap.to(dropdownArrowRef.current,{duration:0.5,rotate: 180,ease: Power1.easeOut})
    }
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
        gsap.to(dropdownArrowRef.current,{duration:0.5,rotate: 0,ease: Power1.easeOut})
    }

    return {
        handleClick: handleClick,
        open:open
    }
}