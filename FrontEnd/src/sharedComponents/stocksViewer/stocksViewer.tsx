//a component that takes in a json dataset, name and type of tab and shows user info on chosen stock

import { useEffect, useState } from "react"
import {v4 as uuidv4} from 'uuid'
import {GET_SYMBOLS,GET_INITIAL_STOCK, GET_STOCK_DATA } from "../../state/Stocks/stocksActionTypes"
import { connect, ConnectedProps, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { Dataset, IStockState } from "../../state/Stocks/stocksSlice"
import { getStockData, IStockQueryParams } from "../../state/Stocks/stocksActions"
import { DropDownTextMenu } from "../dropdownMenuWithSearchbar/dropdownMenu" 
import DropDownMenu from "../dropdownMenu/dropdownMenu"
import HighchartsComponent from "./highcharts"
import {usePromiseTracker} from "react-promise-tracker"
import {ThreeDots} from "react-loader-spinner"
import { IStockSymbolList } from "../../state/Stocks/stocksZodSchemas"
import ApiRequestLimitExceededComponent from "./apiRequestLimitExceededComponent"

interface IHandleSubmit{
   e: React.MouseEvent<HTMLButtonElement, MouseEvent> 
   | 
   React.FormEvent<HTMLFormElement>
}

/*
1) Intraday
   required: function, symbol, interval
2) Daily
   required: function, symbol
3) Weekly 
   required: function, symbol
4) Monthly  
   required: function, symbol
5) Monthly Adjusted
   required: function, symbol



*/
const timeSeries = [
   "TIME_SERIES_INTRADAY",
   "TIME_SERIES_DAILY",
   "TIME_SERIES_WEEKLY",
   "TIME_SERIES_WEEKLY_ADJUSTED",
   "TIME_SERIES_MONTHLY",
   "TIME_SERIES_MONTHLY_ADJUSTED",
]

const timeIntervalsIntraday = [
   "1min",
   "5min",
   "15min",
   "30min",
   "60min",
]

const StocksViewerDataVisualisation = ({datasets}:{datasets:Dataset[]}) => {
   const dataFetchingInProgress = usePromiseTracker()

   if(dataFetchingInProgress.promiseInProgress){
      return(
         <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#4fa94d" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
             /> 
      )
   }
   
   const renderList = datasets.map((dataset) => 
      <li className="mt-5" key={uuidv4()}>
         <HighchartsComponent dataset={dataset} />
      </li>
   )

   if(datasets.length != 0){
      return(
      <ul>
      {renderList}
      </ul>
      )
   }
   return(
      <>
      <p className="text-center">Nothing to show here yet</p>
      </>
   )
}

 const StocksViewer = ({datasets,labels,symbols,currentTimeSeries,timeToWaitForApiRequestSlots}:StocksViewerProps) => {
    const dispatch = useDispatch()
    const [chosenSymbol,setChosenSymbol] = useState("")
    const [chosenSymbolIsCorrect,setChosenSymbolIsCorrect] = useState(false)
    const [chosenTimeSeries,setChosenTimeSeries] = useState("TIME_SERIES_INTRADAY")
    const [chosenTimeIntervalIntraday, setChosenTimeIntervalIntraday] = useState("")

    const handleSubmit = (props:IHandleSubmit) => {
      console.log("clicked handle submit")
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

    useEffect(() => {
        dispatch({type:GET_SYMBOLS});
    },[true])

    return(
        <>
        <form 
        className="mt-[10px] w-2/3 mb-10
         flex flex-col align-stretch justify-center"
         onSubmit={(e) => handleSubmit({e:e})}>
        <label className="text-white mb-[5px]">Symbol</label>
        <DropDownTextMenu 
        dataToVisualise={symbols}
        setChosenValue={setChosenSymbol}
        chosenValue={chosenSymbol}
        isCorrect={chosenSymbolIsCorrect}
        setIsCorrect={setChosenSymbolIsCorrect}
        />
        <label className="text-white mb-[5px]">
         Time Series
         </label>
        <DropDownMenu
        items={timeSeries}
        setChosenValue={setChosenTimeSeries} 
        chosenValue={chosenTimeSeries.length === 0 ? undefined : chosenTimeSeries}/>
        {
        chosenTimeSeries === "TIME_SERIES_INTRADAY" && 
        <>
        <label className="text-white mb-[5px] mt-[5px] align-middle">Time Series</label> 
        <DropDownMenu items={timeIntervalsIntraday} setChosenValue={setChosenTimeIntervalIntraday} 
        chosenValue={chosenTimeIntervalIntraday === "" ? undefined : chosenTimeIntervalIntraday}/> 
        </>
        }
        <button className={`self-end mt-4 font-bold text-white
         text-center align-middle bg-gradient-to-tr from-primary to-secondary
         ${chosenSymbolIsCorrect ? 'outline outline-2 outline-secondary' : 'outline outline-2 outline-red-800'} w-20 h-8 rounded-sm`}
         disabled={chosenSymbolIsCorrect ? false : true}
         >Fetch</button>
         {
            timeToWaitForApiRequestSlots.length != 0 &&
            <>
            <ApiRequestLimitExceededComponent waitArray={timeToWaitForApiRequestSlots} />
            </>
         }
         
        <StocksViewerDataVisualisation datasets={datasets}/>
        </form>
        </>
    )
}


const mapStateToProps = (state:RootState) => {
   return state.stocks;
}
const mapDispatchToProps = (dispatch:AppDispatch) => {
   return {
      getStockData: (props:IStockQueryParams) => dispatch({type:GET_STOCK_DATA,params:props})
   }
}

const connector = connect(mapStateToProps,mapDispatchToProps)

type StocksViewerProps = ConnectedProps<typeof connector>

export default connector(StocksViewer);

