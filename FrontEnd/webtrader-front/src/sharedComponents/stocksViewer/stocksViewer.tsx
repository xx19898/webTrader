//a component that takes in a json dataset, name and type of tab and shows user info on chosen stock

import { useEffect } from "react"
import { Chart } from "react-chartjs-2"
import { stockActionTypes } from "../../state/Stocks/stocksActionTypes"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"

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

 export const StocksViewer = () : JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type:stockActionTypes.GET_SYMBOLS})
    })
    return(

        <div>
            <Chart type={"line"} datasets: />
        </div>
    )

}

