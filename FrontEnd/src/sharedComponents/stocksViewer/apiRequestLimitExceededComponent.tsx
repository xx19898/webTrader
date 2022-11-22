import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED } from "../../state/Stocks/stocksActionTypes"

interface IProgressBarCountdown{
    expirationDate: Date
}

const ProgressBarCountdown = ({expirationDate}:IProgressBarCountdown) => {
    const [timeLeft,setTimeLeft] = useState(countDiffBetweenDateAndCurrDateInSeconds(expirationDate))
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(timeLeft > 0){
            console.log("timeLeft: " + timeLeft)
            const intervalId = setInterval(() => {
                setTimeLeft(countDiffBetweenDateAndCurrDateInSeconds(expirationDate))
            },1000)
            return(() => clearInterval(intervalId))
        }
        if(timeLeft == 0){
            dispatch({type:EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED})
        }
            
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


const countDiffBetweenDateAndCurrDateInSeconds = (date:Date): number => {
    const currDate = new Date()
    const differenceInSeconds = Math.ceil((date.getTime() - currDate.getTime())/1000)
    return differenceInSeconds;
}