import {useState,useRef,useEffect, useLayoutEffect} from 'react';
import { gsap } from 'gsap';

const Svg = () => {
    return(
    <svg xmlns="http://www.w3.org/2000/svg"  data-name="Layer 2" width={30} viewBox="0 0 293 293">
        <path fill="#662483" className='path'  d="M0 0h293v60H0z"/>
        <path fill="#662483" className='path'  d="M0 116.5h293v60H0z"/>
        <path fill="#662483" className='path'  d="M0 233h293v60H0z"/>
    </svg>
    )}

    interface SvgLoaderProps{
        dataIsLoaded: boolean,
        underlyingComponent: React.ReactNode
    }

export default ({dataIsLoaded,underlyingComponent}:SvgLoaderProps) => {
    const [showUnderlyingElement,setShowUnderlyingElement] = useState(dataIsLoaded)

    const tl = useRef<GSAPTimeline>(gsap.timeline())

    function handleDataLoaded(){
        tl.current.clear()
        tl.current.to('.path',{onComplete:() => setShowUnderlyingElement(true),repeat:1,scaleX:0,x:"50%",ease:"bounce.out",duration: 0.3,stagger:{
            amount:0.5
        }})
    }

    useEffect(() => {
        if(showUnderlyingElement == false){
            let ctx = gsap.context(() => {
                tl.current
                .to('.path',{repeat:-1,scaleX:0.1,x:"50%",ease:"bounce.out",duration:0.5,stagger:{
                    amount:0.5,
                }})
            })
            return () => {
                console.log("cleanup")
                ctx.revert()
            }
        }
    },[])

    return(
        <>
        {showUnderlyingElement ? underlyingComponent  : <Svg /> }
        </> 
    )
}