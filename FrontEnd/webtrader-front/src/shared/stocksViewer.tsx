//a component that takes in a json dataset, name and type of tab and shows user info on chosen stock

import { useEffect } from "react"
import { Chart } from "react-chartjs-2"

interface StockViewerProps{
    name: String
}



export const StocksViewer: JSX.Element = (props:StockViewerProps) => {
    return(

        <div>
        <Chart Type></Chart>
        </div>
    )

}