import StocksViewer from "../sharedComponents/stocksViewer/stocksViewer"



export default () => {
    
    return(
        <div className = "bg-secondary-2 min-h-full min-w-full h-auto w-auto flex justify-center">
            <div className="min-h-full h-auto w-[60%] mt-10 flex flex-col justify-streth items-center bg-transparent">
            <h1 className="font-bold mt-[20px] text-2xl text-white">Stock Viewer</h1> 
            <StocksViewer/>
            </div>
        </div>
    )
}