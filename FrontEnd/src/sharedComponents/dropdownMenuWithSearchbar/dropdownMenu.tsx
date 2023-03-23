
import {v4 as uuidv4} from 'uuid'
import { RefObject, useEffect, useMemo, useRef, useState} from "react"
import useDropDownMenu from "./useDropDownMenu"
import DropdownList from './dropdownList'
import { IStockSymbolList } from '../../state/Stocks/stocksZodSchemas'
import BaseDropDown from './baseDropdown'
import useDeepCompareEffect from 'use-deep-compare-effect'



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

interface DataToVisualise{
    [x: string | number]: unknown
}



interface IDropDownMenu{
    dataToVisualise: DataToVisualise[],
    nameOfItem:string,
    chosenValue: string,
    setChosenValue: (newValue:string) => void,
    isCorrect: boolean,
    setIsCorrect: (status:boolean) => void,
}

export const DropDownTextMenu = ({dataToVisualise,chosenValue,setChosenValue,isCorrect,setIsCorrect,nameOfItem}:IDropDownMenu) => {

    useDeepCompareEffect(() => {
        dataToVisualise.forEach( item => {
            if(!(nameOfItem in item)) throw new Error(nameOfItem + " not in data to visualise")
        })
    },[dataToVisualise])
    
    const symbols = useMemo(() => { 
        return dataToVisualise.map(item => item[nameOfItem] as string)
    },[dataToVisualise])
        
    const {
        chosenElement,setChosenElement,
        clickArrowButton,dropDownStatus,
        dropdownRef,setStatusOfDropdown,
        filteredData,
        shouldFocusOnSymbolInput,
        setShouldFocusOnSymbolInput,
        valueHighlightedInList,
        setValueHighlightedInList,
        verifyChosenElement,
        clickOnListItem
        } = useDropDownMenu({list:symbols,chosenElement:chosenValue,setChosenElement:setChosenValue,isCorrect:isCorrect,setIsCorrect:setIsCorrect})
    
        if(dataToVisualise.length != 0){
            if(dropDownStatus){
                //Data is fetched and the list is open
                return(
                    <div className="flex flex-col items-stretch focus-within:outline-1 focus-within:outline focus-within:outline-primary rounded-[17px]" tabIndex={123} ref={dropdownRef}>
                        <BaseDropDown
                        height={20} 
                        value={chosenElement}
                        dataIsFetched={true}
                        clickDropDownArrowButton={clickArrowButton}
                        changeValue={setChosenElement} 
                        dropdownStatus={dropDownStatus}
                        setDropdownStatus={setStatusOfDropdown}
                        shouldFocusOnInput={shouldFocusOnSymbolInput}
                        setShouldFocusOnInput={setShouldFocusOnSymbolInput}
                        valueHighlightedInList={valueHighlightedInList}
                        verifyChosenElement={verifyChosenElement}
                        chosenValueIsCorrect={isCorrect}
                        />

                        <DropdownList 
                        chosenElement={chosenElement}
                        filteredData={filteredData}
                        listItemSize={30}
                        setValue={clickOnListItem}
                        setHighlightedValue={setValueHighlightedInList}
                        />
                    </div>
                )
            }
            //Data is fetched but the list is not open
            return(
                <BaseDropDown
                height={20}
                value={chosenElement}
                dataIsFetched={true} 
                clickDropDownArrowButton={clickArrowButton}
                changeValue={setChosenElement}
                dropdownStatus={dropDownStatus}
                setDropdownStatus={setStatusOfDropdown} 
                shouldFocusOnInput={shouldFocusOnSymbolInput}
                setShouldFocusOnInput={setShouldFocusOnSymbolInput}
                verifyChosenElement={verifyChosenElement}
                chosenValueIsCorrect={isCorrect}
                />
            )
        }
        //Data is yet to be fetched
        return(
            <BaseDropDown
                height={20}
                value={"Stock symbol data is being fetched"}
                dataIsFetched={false}
                clickDropDownArrowButton={clickArrowButton}
                changeValue={setChosenElement}
                dropdownStatus={dropDownStatus}
                setDropdownStatus={setStatusOfDropdown}
                shouldFocusOnInput={false}
                setShouldFocusOnInput={setShouldFocusOnSymbolInput}
                verifyChosenElement={verifyChosenElement}
                chosenValueIsCorrect={false}            />
        )
    }


