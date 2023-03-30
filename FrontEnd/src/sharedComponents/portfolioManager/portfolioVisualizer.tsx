import { randomUUID } from "crypto"
import { Portfolio } from "./portfolioDataSchemas"
import PortfolioStockCard from "./PortfolioStockCard"
import { v4 as uuidv4 } from 'uuid';

const PortfolioVisualizer = ({balance,stocksInPortfolio}:Portfolio) => {
    
    return(
        <section className="w-full">
            <div className="grid grid-cols-2 w-full text-white">
            <p className="col-start-1 flex flex-col justify-center items-center">Balance</p><p className="text-[20px] font-medium col-start-2 flex flex-col justify-center items-center">{balance}$</p>
            </div>
            <ul className="flex flex-col">
                {
                stocksInPortfolio.map(stock => <PortfolioStockCard data={stock} key={uuidv4()}/>)
                }
            </ul>
        </section>
    )
}



export default PortfolioVisualizer