
interface IApiRequestLimitExceededComponent{
    waitArray: Date[]
}

const countDiffBetweenDateAndCurrDateInSeconds = (date:Date): number => {
    const currDate = new Date()
    const differenceInSeconds = Math.abs((date.getTime() - currDate.getTime())/1000)
    return differenceInSeconds;
}

const ApiRequestLimitExceededComponent = ({waitArray}:IApiRequestLimitExceededComponent) => {
    return(
        <div>
            <ul>
                {
                waitArray.map((date) => {
                    return(
                        <li>{countDiffBetweenDateAndCurrDateInSeconds(date)}</li>    
                    )
                })}
            </ul>
        </div>
    )
}


export default ApiRequestLimitExceededComponent;