import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import useDeepCompareEffect from "use-deep-compare-effect";
import { Portfolio } from "./portfolioDataSchemas";


const usePortfolioManager = () => {
    const dispatch = useDispatch()
    const [portfolioData,setPortfolioData] = useState<Portfolio>();
    useDeepCompareEffect(() => {
        
    },[portfolioData])

    return {portfolioData,setPortfolioData}
}

export default usePortfolioManager