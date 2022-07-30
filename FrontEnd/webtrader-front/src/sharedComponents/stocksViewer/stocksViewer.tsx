//a component that takes in a json dataset, name and type of tab and shows user info on chosen stock

import { useEffect } from "react"
import { Chart } from "react-chartjs-2"
import { stockActionTypes } from "../state/Stocks/stocksActionTypes"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"

interface StockViewerProps{
    name: String
}



 export const StocksViewer = () : JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type:stockActionTypes.GET_SYMBOLS})
    })
    return(

        <div>
        <h1>Hello</h1>
        </div>
    )

}

