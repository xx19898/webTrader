import PortfolioManager from "../sharedComponents/portfolioManager/portfolioManager"


export default () => {
    return(
        <div className="bg-secondary-2 flex flex-col justify-center align-center min-w-full min-h-full h-auto  ">
            <div className="w-auto h-auto min-h-full mx-[10%]">
            <h1 className="text-2xl text-white text-center font-bold my-[3rem]">Portfolio Manager</h1>
            <PortfolioManager />
            </div>
        </div>
    ) 
}