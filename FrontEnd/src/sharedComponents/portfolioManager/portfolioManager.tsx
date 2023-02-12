import { useDispatch } from "react-redux"
import PortfolioVisualizer from "./portfolioVisualizer"
import { Portfolio } from "./portfolioDataSchemas"
import StockDealForm from "./stockDealForm"
import StockDealVisualizer from "./stockDealVisualizer"

export const portfolioMockData: Portfolio = {
    balance: 12013,
    stocksInPortfolio: [
        {
            name:'AAPL',
            quantity: 2,
            dateOfAcquisition: new Date(2022,11,10),
            priceOfAcquisition: 1032.4,
        },
        {
            name: 'IC MARKETS:1',
            quantity: 1,
            dateOfAcquisition: new Date(2022,10,8),
            priceOfAcquisition: 1045.3,
        }
    ],
}

const PortfolioManager = ({}) => {
    const dispatch = useDispatch()
    return(
    <>    
    <PortfolioVisualizer 
    balance={portfolioMockData.balance}
    stocksInPortfolio={portfolioMockData.stocksInPortfolio}
    />
    <div className="mt-10">
    <StockDealForm stocks={portfolioMockData.stocksInPortfolio} />
    </div>
    <div className="mt-10">
        <StockDealVisualizer />
    </div>
    </>
    )
}

export default PortfolioManager