import React,{useState,useEffect} from 'react'
import {v4 as uuidv} from 'uuid'
import { useDispatch  } from 'react-redux'
import { StockInPortfolio, stockPriceData } from './portfolioDataSchemas'
import { RootState } from '../../store'
import { useAppSelector } from '../../reduxHooks'
//import { CONNECT, DISCONNECT } from '../../state/Sockets/socketsSlice'
import { finnhubToken } from '../../constants/stocksRelatedConstants'
import GsapPreloader from '../preloaders/gsapPreloader'

const finnhubSocket =  new WebSocket(`wss://ws.finnhub.io?token=${finnhubToken}`)

interface IPortfolioStockCard{
    data:StockInPortfolio
}
//TODO: lift the forming of the connection up to the stock portfolio manager, as there should only be one active connection.
//TODO: subscribing to the symbol can be kept to the stock card 
const PortfolioStockCard = (props:IPortfolioStockCard) => {
    const [currentStockPrice,setCurrentStockPrice] = useState<undefined | number>(undefined)
    const {name,dateOfAcquisition,quantity,priceOfAcquisition} = props.data
    useEffect(() => {
      finnhubSocket.addEventListener('open', () => {
        console.log("CONNECTION OPENED")
        finnhubSocket.send(JSON.stringify({'type':'subscribe','symbol':name}))
      })
      finnhubSocket.addEventListener('message',function(event){
        const data = JSON.parse(event.data)
        console.log(data)
        const parsedData = stockPriceData.parse(data)
        const lastEntry = parsedData.data[data.data.length - 1].p
        setCurrentStockPrice(lastEntry)
      })
      return () => {
        finnhubSocket.send(JSON.stringify({'type':'unsubscribe','symbol':name}))
        finnhubSocket.removeEventListener('open',() => finnhubSocket.send(JSON.stringify({'type':'subscribe','symbol':props.data.name})))
      }
    }, [])
    const x = {"data":
    [{
      "c":["1","24","12"],"p":133.55,"s":"AAPL","t":1673521938710,"v":10
    },{
      "c":["1","24","12"],"p":133.55,"s":"AAPL","t":1673521938710,"v":10
    },{
      "c":["1","8","24","12"],"p":133.55,"s":"AAPL","t":1673521938710,"v":33
    }],
    "type":"trade"}
    
    
    return (
        <li key={uuidv()} className="grid gap-2 grid-cols-2 grid-rows-2 p-6 bg-darker-secondary-2 m-2 rounded-lg drop-shadow-md drop-shadow- shadow-lg text-secondary-2">
            <div className="relative left-[20%] font-semibold text-white">Name: </div><div className="font-normal text-lg text-center  text-white">{name}</div>
            <div className="relative left-[20%] font-semibold text-white">Date of acquisition</div><div className="font-normal text-center text-white">{dateOfAcquisition.toLocaleString().split(',')[0]}</div>
            <div className="relative left-[20%] font-semibold text-white">Original Price</div><div className="font-normal text-center text-white">{priceOfAcquisition}</div>
            <div className="relative left-[20%] font-semibold text-white">Quantity</div><div className="font-normal text-center text-white">{quantity}</div>
            <div className="relative left-[20%] font-semibold text-white">Current Price</div><div className="font-normal text-center  flex justify-center items-center text-white">{currentStockPrice}</div>
        </li>
    )
}

export default PortfolioStockCard
