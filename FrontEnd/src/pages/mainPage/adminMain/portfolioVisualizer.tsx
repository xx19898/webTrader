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
            <section className="grid grid-cols-2 bg-darker-secondary-2 text-white my-[20px] rounded-[17px] w-full">
                <label className="flex justify-center text-center items-center col-start-1 my-[10px] mx-[10px] text-[20px] font-normal">Balance</label>
                <p className="flex justify-center text-center items-center col-start-2 my-[10px] mx-[10px] text-[30px] font-medium">{portfolio.balance}</p>
            </section>
            <ul className="w-full flex flex-col justify-center items-center">
                {
                    portfolio.portfolioStocks.map(stock => {
                        return(
                            <li className=
                            "w-[80%] my-[40px] flex flex-col justify-center items-center bg-gradient-to-tr from-secondary to-secondary-2 rounded-[17px] drop-shadow-md">
                                <h3 className="text-center text-white font-medium text-[36px] mt-[40px]">{stock.symbol}</h3>
                                <section className="grid grid-cols-2 gap-y-[20px]  place-items-center w-[60%] place-content-around">
                                    <p className="text-white text-[18px] font-normal">Price</p><p className="font-medium text-white text-[20px]">{stock.priceAtAcquirement}</p>
                                    <p className="text-white text-[18px] font-normal">Quantity</p><p className="font-medium text-white text-[20px]">{stock.quantity}</p>
                                    <p className="text-white text-[18px] font-normal mb-[40px]"><span className="white-nowrap">Total Price</span></p><p className="font-medium text-[20px] text-white mb-[40px]">{stock.quantity * stock.priceAtAcquirement}</p>                                    
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