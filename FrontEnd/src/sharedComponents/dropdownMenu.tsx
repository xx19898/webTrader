import { useEffect, useState } from "react"
import { DropDownArrowIcon } from "../icons/dropdownArrowIcon"
import { IStockSymbolList } from "../state/Stocks/stocksZodSchemas"

interface IDropDownMenu{
    dataToVisualise: IStockSymbolList,
    passUpTheChosenValue: (newValue:string) => void,
}

interface IBaseDropDown{
    height:number,
    value:string,
    dataIsFetched?:boolean,
    clickDropDownArrowButton: () => void,
    changeValue: (newValue:string) => void,
}
//fix useRef for closing dropdown when clicked outside of the element
function useOutsideAlerter(ref:any,closeDropdown : () => void){
    useEffect(() => {
        function handleClickOutside(event:any){
            if(ref.current && !ref.current.contains(event.target)){
                closeDropdown()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[ref])
}
/* make optional rendering to wait for data, if datatovisualise.size is 0, then only give blank 
text field where it stands that symbols are not yet ready to be shown */
const BaseDropDown:React.FC<IBaseDropDown> = 
({height,value,dataIsFetched,clickDropDownArrowButton,changeValue}) => {
    if(dataIsFetched){
        return(
            <div className="relative flex flex-row items-center align-stretch bg-white focus-within:outline-2 focus-within:outline focus-within:outline-secondary" tabIndex={0}>
                <input className="mr-[20px] bg-white p-2 text-right rounded-sm focus:outline-none" type="search" value={value} onChange={(e) => changeValue(e.target.value)} />
                <div className="flex flex-row items-center justify-center absolute right-2 min-h-full bg-white">
                    <button className="cursor-pointer" onClick={() => clickDropDownArrowButton()}><DropDownArrowIcon height={height}/></button>
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="relative flex flex-row items-center align-stretch bg-white focus-within:outline-2 focus-within:outline focus-within:outline-secondary" tabIndex={0}>
                <input className="mr-[20px] bg-white p-2 text-right  rounded-sm focus:outline-none" type="search" value={value} onChange={(e) => changeValue(e.target.value)}/>
                <div className="absolute right-2 min-h-full bg-white flex flex-row items-center justify-center">
                    <DropDownArrowIcon height={height}/>
                </div>
            </div>
    )
}
}
export const DropDownTextMenu: React.FC<IDropDownMenu> = ({dataToVisualise,passUpTheChosenValue}) => {
    const [open,setStatusOfDropdown] = useState(false)
    const [chosenElement,setChosenElement] = useState("")

    function clickArrowButton(){
        console.log("pressed button")
        open === true ? setStatusOfDropdown(false) : setStatusOfDropdown(true)
    } 
    
        if(dataToVisualise.length != 0){
            if(open){
                return(
                    <div className="static flex flex-col items-stretch focus-within:outline-2 focus-within:outline focus-within:outline-secondary" tabIndex={123}>
                        <BaseDropDown height={20} value={chosenElement}  dataIsFetched={true} clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement}/>
                    <ul className="relative block bg-white w-full h-28 overflow-scroll ">
                        { dataToVisualise.map(
                            (element,index) => index == (dataToVisualise.length - 1)
                            ?
                            <li className="w-auto bg-gray-300 list-item content-end hover:bg-secondary-2/30 hover:cursor-pointer text-right"><p className="mr-[20px]">{element.symbol}</p></li>
                            :
                            <li className="w-auto bg-gray-300 content-end  text-right after:content-['']
                                           after:w-full after:bg-primary/40 after:rounded-sm hover:bg-secondary-2/30 hover:cursor-pointer after:h-[1.5px] after:absolute after:list-item after:box-content "><p className="mr-[20px]">{element.symbol}</p></li>
                            )}
                    </ul>
                    </div>
                )
            }
            return(
                <BaseDropDown height={20} value={chosenElement} dataIsFetched={true} 
                clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement}
                />
            )
        }
        return(
            <BaseDropDown height={20} value={"Stock symbol data is being fetched"} dataIsFetched={false}
            clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement}
            />
        )
    }


