import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED } from "../../state/Stocks/stocksSlice"

interface IProgressBarCountdown{
    expirationDate: Date
}

const ProgressBarCountdown = ({expirationDate}:IProgressBarCountdown) => {
    const [timeLeft,setTimeLeft] = useState(countDiffBetweenDateAndCurrDateInSeconds(expirationDate))
    const dispatch = useDispatch()
    
    useEffect(() => {
            const intervalId = setInterval(() => {
                const timeLeftCurrent = countDiffBetweenDateAndCurrDateInSeconds(expirationDate)
                if(timeLeftCurrent <= 1){
                    console.log("deleting progress bars")
                    dispatch(EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED())
                }else{setTimeLeft(timeLeftCurrent)}
            },100)
            return(() => clearInterval(intervalId))   
    },[expirationDate])

    return(
        <li>{timeLeft}</li>
    )
}




interface IApiRequestLimitExceededComponent{
    waitArray: Date[]
}


const ApiRequestLimitExceededComponent = ({waitArray}:IApiRequestLimitExceededComponent) => {
    return(
        <div>
            <ul>
                {
                waitArray.map((date) => {
                    return(
                        <ProgressBarCountdown expirationDate={date}/>    
                    )
                })}
            </ul>
        </div>
    )
}


export default ApiRequestLimitExceededComponent;


export const countDiffBetweenDateAndCurrDateInSeconds = (date:Date): number => {
    const currDate = new Date()
    const differenceInSeconds = Math.ceil((date.getTime() - currDate.getTime())/1000)
    return differenceInSeconds;
}