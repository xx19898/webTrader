import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED } from "../../state/Stocks/stocksSlice"
import {v4 as uuidv4} from 'uuid'
import { cooldownExpirationTimeForStockApiRequestSlotInSeconds } from "../../constants/stocksRelatedConstants"
import { Root } from "react-dom/client"
import { RootState } from "../../store"
import gsap from "gsap"


interface IProgressBarCountdown{
    expirationDate: Date,
}

const countProcentsLeft = (timeLeft:number,origTimeToWait:number) => {
    if(timeLeft === origTimeToWait) return 100
    else{
        return Math.round(timeLeft*100/origTimeToWait)
    }
}

const ProgressBarCountdown = ({expirationDate}:IProgressBarCountdown) => {
    const origTimeToWaitRef = useRef(0)
    const progressBarRef = useRef(null)
    const [timeLeft,setTimeLeft] = useState(countDiffBetweenDateAndCurrDateInSeconds(expirationDate))
    const dispatch = useDispatch()
    const procentsLeft = countProcentsLeft(timeLeft,cooldownExpirationTimeForStockApiRequestSlotInSeconds)
    
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.fromTo(progressBarRef.current,{width:`${procentsLeft}%`},{width:'0%',onComplete: () => {dispatch(EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED())}}).duration(timeLeft)
        },)
        return () => ctx.revert()
    })
    
    useEffect(() => {
        origTimeToWaitRef.current = countDiffBetweenDateAndCurrDateInSeconds(expirationDate)
    },[])


    return(
        <li 
        key={uuidv4()} 
        className="text-center bg-sec-primary w-full h-6">
            <div ref={progressBarRef} className={"bg-primary h-full rounded"}></div>
        </li>
    )
}




interface IApiRequestLimitExceededComponent{
    waitArray: Date[]
}


const ApiRequestLimitExceededComponent = () => {
    const waitArray = useSelector<RootState, Date[]>((state) => state.stocks.timeToWaitForApiRequestSlots)

    return(
        <ul className={'flex flex-col gap-2'}>
            {
                waitArray.map( element => {
                    return(
                        <ProgressBarCountdown expirationDate={element} key={uuidv4()} />
                    )
                })
            }
        </ul>
    )
}


export default ApiRequestLimitExceededComponent;


export const countDiffBetweenDateAndCurrDateInSeconds = (date:Date): number => {
    const currDate = new Date()
    const differenceInSeconds = Math.ceil((date.getTime() - currDate.getTime())/1000)
    return differenceInSeconds;
}