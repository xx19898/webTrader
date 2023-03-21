import { Portfolio } from "./adminMainPageSchema";


interface IPortfolioVisualizer{
    portfolio:Portfolio,
    username:string
}
export default ({portfolio,username}:IPortfolioVisualizer) => {
    
    if(portfolio === undefined){
        return(
        <section>
            <h2>{username}</h2>
            <p>No stocks in this portfolio</p>
        </section>
    )}
    else{
        return(
            <div className="w-full h-auto flex flex-col justify-center items-center">
            <h2 className="text-center text-white text-[36px] my-[40px]">Portfolio</h2>
            <ul className="w-full flex flex-col justify-center items-center">
                {
                    portfolio.portfolioStocks.map(stock => {
                        return(
                            <li className=
                            "w-[80%] first:my-[40px] last:mb-[40px] flex flex-col justify-center items-center bg-gradient-to-tr from-secondary to-secondary-2 rounded-[17px] drop-shadow-md">
                                <h3 className="text-center text-white font-medium text-[36px] mt-[40px]">{stock.symbol}</h3>
                                <section className="grid grid-cols-2 gap-y-[20px]  place-items-center w-[60%] place-content-around">
                                    <p className="text-white text-[18px] font-normal">Price</p><p className="font-medium text-white">{stock.priceAtTheAcquirement}</p>
                                    <p className="text-white text-[18px] font-normal">Quantity</p><p className="font-medium text-white">{stock.quantity}</p>
                                    <p className="text-white text-[18px] font-normal"><span className="white-nowrap">Total Price</span></p><p className="font-medium text-white">{stock.quantity * stock.priceAtTheAcquirement}</p>                                    
                                </section>
                            </li>
                        )
                    })
                }
            </ul>
            </div>
        )
    }
}