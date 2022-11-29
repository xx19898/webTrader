import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { apiCallLimitPerTimeUnit } from "../../constants/stocksRelatedConstants"
import { GET_STOCK_DATA, GET_SYMBOLS } from "../../state/Stocks/stocksActionTypes"
import { countDiffBetweenDateAndCurrDateInSeconds } from "./apiRequestLimitExceededComponent"
import { RootState } from "../../store"
import { EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED } from "../../state/Stocks/stocksSlice"
import { time } from "console"

const timeSeries = [
    "TIME_SERIES_INTRADAY",
    "TIME_SERIES_DAILY",
    "TIME_SERIES_WEEKLY",
    "TIME_SERIES_WEEKLY_ADJUSTED",
    "TIME_SERIES_MONTHLY",
    "TIME_SERIES_MONTHLY_ADJUSTED",
 ]
 
 enum TimeSeries {
    TIME_SERIES_INTRADAY = "TIME_SERIES_INTRADAY",
    TIME_SERIES_DAILY = "TIME_SERIES_DAILY",
    TIME_SERIES_WEEKLY = "TIME_SERIES_WEEKLY",
    TIME_SERIES_WEEKLY_ADJUSTED = "TIME_SERIES_WEEKLY_ADJUSTED",
    TIME_SERIES_MONTHLY = "TIME_SERIES_MONTHLY",
    TIME_SERIES_MONTHLY_ADJUSTED = "TIME_SERIES_MONTHLY_ADJUSTED",
 }
 
 const timeIntervalsIntraday = [
    "1min",
    "5min",
    "15min",
    "30min",
    "60min",
 ]

interface IHandleSubmit{
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> 
    | 
    React.FormEvent<HTMLFormElement>
 }
 
export  default () => {
    const datasets = useSelector((state:RootState) => state.stocks.datasets)
    const symbols = useSelector((state:RootState) => state.stocks.symbols)
    const timeToWaitForApiRequestSlots = useSelector((state:RootState) => state.stocks.timeToWaitForApiRequestSlots)
    const dispatch = useDispatch()

    const [chosenSymbol,setChosenSymbol] = useState("")
    const [chosenSymbolIsCorrect,setChosenSymbolIsCorrect] = useState(false)

    const [chosenTimeSeries,setChosenTimeSeries] = useState("TIME_SERIES_INTRADAY")
    const [chosenTimeIntervalIntraday, setChosenTimeIntervalIntraday] = useState("")

    let apiRequestLimitExceeded = false;

    const handleSubmit = (props:IHandleSubmit) => {
        props.e.preventDefault()
        const dataRequestingDispatch = {
           type:GET_STOCK_DATA,stockParams:
           {symbols:[chosenSymbol],
            function:chosenTimeSeries,
            interval: chosenTimeIntervalIntraday.length === 0 
            ? undefined : chosenTimeIntervalIntraday}
           }
        dispatch(dataRequestingDispatch)
        }
  
     const fetchButtonStatus = () => {
        if( !apiRequestLimitExceeded && chosenTimeSeries !== TimeSeries.TIME_SERIES_INTRADAY.toString() && chosenSymbolIsCorrect ){
           return true
        }
        if(!apiRequestLimitExceeded &&
           chosenTimeSeries === TimeSeries.TIME_SERIES_INTRADAY.toString() &&
           timeIntervalsIntraday.includes(chosenTimeIntervalIntraday)){
           return true
        }
        return false
     }
  
      useEffect(() => {
          dispatch({type:GET_SYMBOLS});
      },[true])
  
      useEffect(() => {
        apiRequestLimitExceeded = !(timeToWaitForApiRequestSlots.length >= apiCallLimitPerTimeUnit)
      })
  
      useEffect(() => {
        if(timeToWaitForApiRequestSlots.length != 0){
           timeToWaitForApiRequestSlots.forEach((expirationDate) => {
              if(countDiffBetweenDateAndCurrDateInSeconds(expirationDate) <= 0){
                 dispatch(EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED())
              }
           })       
     }
      },[timeToWaitForApiRequestSlots])

      return {
        dispatch: dispatch,
        datasets: datasets,
        symbols: symbols,

        chosenSymbolIsCorrect: chosenSymbolIsCorrect,
        setChosenSymbolIsCorrect: setChosenSymbolIsCorrect,

        timeToWaitForApiRequestSlots: timeToWaitForApiRequestSlots,
        apiRequestLimitExceeded: apiRequestLimitExceeded,

        handleSubmit: handleSubmit,

        chosenTimeSeries: chosenTimeSeries,
        setChosenTimeSeries: setChosenTimeSeries,

        chosenSymbol: chosenSymbol,
        setChosenSymbol: setChosenSymbol,

        chosenTimeIntervalIntraday: chosenTimeIntervalIntraday,
        setChosenTimeIntervalIntraday: setChosenTimeIntervalIntraday,
      }
}