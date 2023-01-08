import { useDispatch } from "react-redux"
import PortfolioVisualizer from "./portfolioVisualizer"
import { Portfolio } from "./portfolioDataSchemas"

export const portfolioMockData: Portfolio = {
    balance: 12013,
    stocksInPortfolio: [
        {
            name:'APPLE',
            quantity: 2,
            dateOfAcquisition: new Date(2022,11,10),
            priceOfAcquisition: 1032.4
        },
        {
            name: 'AC',
            quantity: 1,
            dateOfAcquisition: new Date(2022,10,8),
            priceOfAcquisition: 1045.3
        }
    ],
}

const PortfolioManager = ({}) => {
    const dispatch = useDispatch()

    return(
    <div>    
    <PortfolioVisualizer 
    balance={portfolioMockData.balance}
    stocksInPortfolio={portfolioMockData.stocksInPortfolio}
    />
    </div>
    )
}

export default PortfolioManager