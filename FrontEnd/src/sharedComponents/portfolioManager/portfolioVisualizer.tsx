import { randomUUID } from "crypto"
import { Portfolio } from "./portfolioDataSchemas"
import PortfolioStockCard from "./PortfolioStockCard"
import { v4 as uuidv4 } from 'uuid';

const PortfolioVisualizer = ({balance,stocksInPortfolio}:Portfolio) => {
    
    return(
        <ul className="flex flex-col">
            {stocksInPortfolio.map(stock => <PortfolioStockCard data={stock} key={uuidv4()}/>)}
        </ul>
    )
}



export default PortfolioVisualizer