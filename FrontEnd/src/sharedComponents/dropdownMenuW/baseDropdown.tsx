import { RefObject, useEffect, useRef, useState } from "react"
import { DropDownArrowIcon } from "../../icons/dropdownArrowIcon"

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
    valueHighlightedInList?: string,
}

const BaseDropDown = 
({height,value,dataIsFetched,clickDropDownArrowButton,changeValue,
  dropdownStatus,setDropdownStatus,shouldFocusOnInput,setShouldFocusOnInput,valueHighlightedInList}:IBaseDropDown) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null)
    const [dropdownWasNotPreviouslyOpen,setDropdownWasNotPreviouslyOpen] = useState(true)
    useEffect( () => {
        if(shouldFocusOnInput && inputRef != null){
            inputRef.current && inputRef.current.focus()
    }
},[shouldFocusOnInput])
    const valueChanged = (newValue:string) => {
        //Input was empty, now typed something that is not empty
        if(value.trim().length === 0 && newValue.length != 0){
            //If dropdown is not open, open it
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
            //retain focus on input if user deleted last string - so that input is empty
            if(value.length !== 0){
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
                 type="search" value={valueHighlightedInList ? valueHighlightedInList : value} onChange={(e) => valueChanged(e.target.value)} ref={inputRef}/>
                <div className="flex flex-row items-center justify-center absolute right-2 min-h-full bg-white">
                    <button className="cursor-pointer" onClick={() => clickDropDownArrowButton()}><DropDownArrowIcon height={height}/></button>
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="relative flex h-[44px] flex-row items-center align-stretch bg-white focus-within:outline-2 focus-within:outline focus-within:outline-red-600" tabIndex={0}>
                <input className=" w-full bg-white text-right mr-8  rounded-sm focus:outline-none"
                 type="search" value={value} onChange={(e) => valueChanged(e.target.value)}/>
                <div className="absolute right-2 min-h-full bg-white flex flex-row items-center justify-center">
                    <DropDownArrowIcon height={height}/>
                </div>
        </div>
    )
}
  }

export default BaseDropDown