//a component that takes in a json dataset, name and type of tab and shows user info on chosen stock

import { useEffect, useState } from "react"
import { Chart } from "react-chartjs-2"
import {GET_SYMBOLS,GET_INITIAL_STOCK, GET_STOCK_DATA } from "../../state/Stocks/stocksActionTypes"
import { connect, ConnectedProps, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { IStockState } from "../../state/Stocks/stocksSlice"
import { IStockQueryParams } from "../../state/Stocks/stocksActions"
import { DropDownTextMenu } from "../dropdownMenuW/Searchbar/dropdownMenu"
import DropDownMenu from "../dropdownMenu/dropdownMenu"

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

 const StocksViewer = (props:StocksViewerProps) => {
    const dispatch = useDispatch()
    const [chosenSymbol,setChosenSymbol] = useState("")
    const [chosenTimeSeries,setChosenTimeSeries] = useState("")

    useEffect(() => {
        dispatch({type:GET_SYMBOLS});
        console.log("dispatched get symbols")
    },[])
    return(
        <>
        <form className="mt-[10px] w-3/4 mb-10 flex flex-col align-stretch justify-center">
        <label className="text-white mb-[5px]">Symbol</label>
        <DropDownTextMenu dataToVisualise={props.symbols} passUpTheChosenValue={setChosenSymbol}/>
        <label className="text-white mb-[5px]">Time Series</label>
        <DropDownMenu items={timeSeries} setChosenValue={setChosenTimeSeries} 
        chosenValue={chosenTimeSeries.length === 0 ? undefined : chosenTimeSeries}/>

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

