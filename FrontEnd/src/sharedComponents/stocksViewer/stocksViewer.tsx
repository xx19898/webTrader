//a component that takes in a json dataset, name and type of tab and shows user info on chosen stock

import { useEffect, useState } from "react"
import { Chart } from "react-chartjs-2"
import {GET_SYMBOLS,GET_INITIAL_STOCK, GET_STOCK_DATA } from "../../state/Stocks/stocksActionTypes"
import { connect, ConnectedProps, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { IStockState } from "../../state/Stocks/stocksSlice"
import { IStockQueryParams } from "../../state/Stocks/stocksActions"
import { DropDownTextMenu } from "../dropdownMenu/dropdownMenu"

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

 const StocksViewer = (props:StocksViewerProps) => {
    const dispatch = useDispatch()
    const [chosenSymbol,setChosenSymbol] = useState("")
    useEffect(() => {
        dispatch({type:GET_SYMBOLS});
        console.log("dispatched get symbols")
    },[])
    return(
        <>
        <form className="mt-[10px] mb-10 flex flex-col align-stretch justify-center">
        <DropDownTextMenu dataToVisualise={props.symbols} passUpTheChosenValue={setChosenSymbol} />
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

