import {v4 as uuidv4} from 'uuid'
import { RefObject, useEffect, useMemo, useRef} from "react"

import { DropDownArrowIcon } from "../../icons/dropdownArrowIcon"
import { IStockSymbolList } from "../../state/Stocks/stocksZodSchemas"
import useDropDownMenu from "./useDropDownMenu"


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

interface IBaseDropDown{
    height:number,
    value:string,
    dataIsFetched?:boolean,
    dropdownStatus: boolean,
    setDropdownStatus: (newStatus:boolean) => void,
    clickDropDownArrowButton: () => void,
    changeValue: (newValue:string) => void,
    shouldFocusOnInput ?: boolean
}

const BaseDropDown:React.FC<IBaseDropDown> = 
({height,value,dataIsFetched,clickDropDownArrowButton,changeValue,dropdownStatus,setDropdownStatus,shouldFocusOnInput}) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null)
    useEffect( () => {
        if(shouldFocusOnInput && inputRef != null){
            inputRef.current && inputRef.current.focus()
    }
},[])
    const valueChanged = (newValue:string) => {
        if(value.trim().length === 0){
            if(!dropdownStatus) setDropdownStatus(true)
            changeValue(newValue)    
        }
        if(newValue.length === 0){
            changeValue(newValue)
            setDropdownStatus(false)
        }
        else{
            if(!dropdownStatus) setDropdownStatus(true)
            changeValue(newValue)     
        }
    }
    if(dataIsFetched){
        return(
            <div className="relative flex flex-row items-center align-stretch bg-white focus-within:outline-2 focus-within:outline focus-within:outline-primary" tabIndex={0}>
                <input className="mr-[20px] bg-white p-2 text-right rounded-sm focus:outline-none"
                 type="search" value={value} onChange={(e) => valueChanged(e.target.value)} ref={inputRef}/>
                <div className="flex flex-row items-center justify-center absolute right-2 min-h-full bg-white">
                    <button className="cursor-pointer" onClick={() => clickDropDownArrowButton()}><DropDownArrowIcon height={height}/></button>
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="relative flex flex-row items-center align-stretch bg-white focus-within:outline-2 focus-within:outline focus-within:outline-red-600" tabIndex={0}>
                <input className="mr-[20px] bg-white p-2 text-right  rounded-sm focus:outline-none" type="search" value={value} onChange={(e) => valueChanged(e.target.value)}/>
                <div className="absolute right-2 min-h-full bg-white flex flex-row items-center justify-center">
                    <DropDownArrowIcon height={height}/>
                </div>
            </div>
    )
}
}
interface IDropDownMenu{
    dataToVisualise: IStockSymbolList,
    passUpTheChosenValue: (newValue:string) => void,
}
export const DropDownTextMenu = ({dataToVisualise,passUpTheChosenValue}:IDropDownMenu) => {
    const symbols = useMemo(() => {
        return dataToVisualise.map( item => item.symbol)
    },[dataToVisualise])
    const shouldFocusOnInput = false
    
    //TODO: IMPLEMENT USEREF SO THAT DROPDOWN INPUT RETAINS THE FOCUS WHEN THE FIRST CHARACTER IS TYPED IN, USE USEEFFECT IN PAIR WITH USESTATE VARIABLE 'FOCUSONNEXTRENDER'
    const {chosenElement,setChosenElement,
           clickArrowButton,dropDownStatus,
           dropdownRef,setStatusOfDropdown,
           chosenElementIsCorrect,
           setChosenElementIsCorrect,
           filteredData,
           } = useDropDownMenu({list:symbols})
    
        if(dataToVisualise.length != 0){
            if(dropDownStatus){
                return(
                    <div className="flex flex-col items-stretch focus-within:outline-2 focus-within:outline focus-within:outline-primary" tabIndex={123} ref={dropdownRef}>
                        <BaseDropDown height={20} value={chosenElement}  dataIsFetched={true}
                        clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement} 
                        dropdownStatus={dropDownStatus} setDropdownStatus={setStatusOfDropdown} shouldFocusOnInput={true}/>
                    <ul className="relative block bg-white w-full max-h-20 overflow-scroll">
                        {
                            filteredData.length === 0 
                            ? 
                            <li className="w-auto bg-gray-300 content-end  text-right after:content-['']
                            after:w-full after:bg-primary/40 after:rounded-sm hover:bg-secondary-2/30 hover:cursor-pointer after:h-[1.5px] 
                            after:absolute after:list-item after:box-content "><p className="mr-[20px]">{"None found"}</p></li>
                            : 
                        filteredData.map(
                            (symbol,index) => index == (dataToVisualise.length - 1)
                            ?
                            <li key={uuidv4()} className="w-auto bg-gray-300 list-item content-end hover:bg-secondary-2/30 hover:cursor-pointer text-right"><p className="mr-[20px]">{symbol}</p></li>
                            :
                            <li key={uuidv4()} className="w-auto bg-gray-300 content-end  text-right after:content-['']
                                           after:w-full after:bg-primary/40 after:rounded-sm hover:bg-secondary-2/30 hover:cursor-pointer after:h-[1.5px] after:absolute after:list-item after:box-content "><p className="mr-[20px]">{symbol}</p></li>
                            )}
                    </ul>
                    </div>
                )
            }
            return(
                <BaseDropDown height={20} value={chosenElement} dataIsFetched={true} 
                clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement}
                dropdownStatus={dropDownStatus} setDropdownStatus={setStatusOfDropdown}
                />
            )
        }
        return(
            <BaseDropDown height={20} value={"Stock symbol data is being fetched"} dataIsFetched={false}
            clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement}
            dropdownStatus={dropDownStatus} setDropdownStatus={setStatusOfDropdown}
            />
        )
    }


