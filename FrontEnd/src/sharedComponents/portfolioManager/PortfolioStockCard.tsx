import React,{useState,useEffect} from 'react'
import { useDispatch  } from 'react-redux'
import { StockInPortfolio } from './portfolioDataSchemas'
import { RootState } from '../../store'
import { useAppSelector } from '../../reduxHooks'
import { CONNECT, DISCONNECT } from '../../state/Sockets/socketsSlice'

interface IPortfolioStockCard{
    data:StockInPortfolio
}

const PortfolioStockCard = (props:IPortfolioStockCard) => {
    const dispatch = useDispatch()
    const finnhubSocket = useAppSelector( state => state.sockets.finnhubSocket)
    const [currentStockPrice,setCurrentStockPrice] = useState(undefined)
    const {name,dateOfAcquisition,quantity,priceOfAcquisition} = props.data
    useEffect(() => {
      dispatch(CONNECT())
      finnhubSocket.on('connect',() => {
        console.log("CONNECTED!")
        finnhubSocket.emit(JSON.stringify({'type':'subscribe', 'symbol':name}))
        finnhubSocket.on('message',(event:any) => {
            console.log(event.data)
            setCurrentStockPrice(event.data)
        })
      })
      return () => {
        finnhubSocket.off('connect')
        finnhubSocket.off('message')
        dispatch(DISCONNECT())
      }
    }, [])
    
    return (
        <li className="flex flex-col p-4 bg-white m-2 rounded-lg shadow-lg">
            <h1></h1>
        </li>
    )
}

export default PortfolioStockCard
