
import {v4 as uuidv4} from 'uuid'
import { RefObject, useEffect, useMemo, useRef, useState} from "react"

import { DropDownArrowIcon } from "../../../icons/dropdownArrowIcon"
import { IStockSymbolList } from "../../../state/Stocks/stocksZodSchemas"
import useDropDownMenu from "./useDropDownMenu"
import DropdownList from './dropdownList'


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
    shouldFocusOnInput: boolean
    setShouldFocusOnInput: (focus:boolean) => void,
}

const BaseDropDown = 
({height,value,dataIsFetched,clickDropDownArrowButton,changeValue,
  dropdownStatus,setDropdownStatus,shouldFocusOnInput,setShouldFocusOnInput}:IBaseDropDown) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null)
    const [dropdownWasNotPreviouslyOpen,setDropdownWasNotPreviouslyOpen] = useState(true)
    useEffect( () => {
        if(shouldFocusOnInput && inputRef != null){
            inputRef.current && inputRef.current.focus()
    }
},[shouldFocusOnInput])
    const valueChanged = (newValue:string) => {
        //Input was empty, now typed something
        if(value.trim().length === 0 && newValue.length != 0){
            if(!dropdownStatus){
                setDropdownWasNotPreviouslyOpen(false)
                setDropdownStatus(true)
            }
            else{
                setDropdownWasNotPreviouslyOpen(false)
            }
            changeValue(newValue)    
        }
        if(newValue.length === 0){
            if(value.length !== 0){
                console.log("got here")
                setShouldFocusOnInput(true)
            }
            changeValue(newValue)
            setDropdownWasNotPreviouslyOpen(true)
            setDropdownStatus(false)
        }
        else{
            if(!dropdownStatus){
                setDropdownWasNotPreviouslyOpen(true)
                setDropdownStatus(true)
            }    
            changeValue(newValue)     
        }
    }
    if(dataIsFetched){
        return(
            <div className="relative flex h-[44px] flex-row items-center align-stretch bg-white focus-within:outline-2 focus-within:outline focus-within:outline-primary" tabIndex={0}>
                <input className="w-full text-right mr-8 bg-white rounded-sm focus:outline-none"
                 type="search" value={value} onChange={(e) => valueChanged(e.target.value)} ref={inputRef}/>
                <div className="flex flex-row items-center justify-center absolute right-2 min-h-full bg-white">
                    <button className="cursor-pointer" onClick={() => clickDropDownArrowButton()}><DropDownArrowIcon height={height}/></button>
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="relative flex h-[44px] flex-row items-center align-stretch bg-white focus-within:outline-2 focus-within:outline focus-within:outline-red-600" tabIndex={0}>
                <input className=" w-full bg-white text-right mr-8  rounded-sm focus:outline-none" type="search" value={value} onChange={(e) => valueChanged(e.target.value)}/>
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
    
    
    const {chosenElement,setChosenElement,
           clickArrowButton,dropDownStatus,
           dropdownRef,setStatusOfDropdown,
           chosenElementIsCorrect,
           setChosenElementIsCorrect,
           filteredData,
           shouldFocusOnSymbolInput,
           setShouldFocusOnSymbolInput,
           } = useDropDownMenu({list:symbols})
    
        if(dataToVisualise.length != 0){
            if(dropDownStatus){
                //Data is fetched and the list is open
                return(
                    <div className="flex flex-col items-stretch focus-within:outline-2 focus-within:outline focus-within:outline-primary" tabIndex={123} ref={dropdownRef}>
                        <BaseDropDown height={20} value={chosenElement}  dataIsFetched={true}
                        clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement} 
                        dropdownStatus={dropDownStatus} setDropdownStatus={setStatusOfDropdown}
                        shouldFocusOnInput={shouldFocusOnSymbolInput} setShouldFocusOnInput={setShouldFocusOnSymbolInput}/>

                        <DropdownList 
                        chosenElement={chosenElement}
                        dataToVisualise={dataToVisualise}
                        filteredData={filteredData}
                        listItemSize={30}/>
                    </div>
                )
            }
            //Data is fetched but the list is not open
            return(
                <BaseDropDown height={20} value={chosenElement} dataIsFetched={true} 
                clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement}
                dropdownStatus={dropDownStatus} setDropdownStatus={setStatusOfDropdown} 
                shouldFocusOnInput={shouldFocusOnSymbolInput}
                setShouldFocusOnInput={setShouldFocusOnSymbolInput}
                />
            )
        }
        //Data has yet to be fetched
        return(
            <BaseDropDown height={20} value={"Stock symbol data is being fetched"} dataIsFetched={false}
            clickDropDownArrowButton={clickArrowButton} changeValue={setChosenElement}
            dropdownStatus={dropDownStatus} setDropdownStatus={setStatusOfDropdown}
            shouldFocusOnInput={false} setShouldFocusOnInput={setShouldFocusOnSymbolInput}
            />
        )
    }


