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
    verifyChosenElement: () => void,
    chosenValueIsCorrect: boolean
}

const BaseDropDown = 
({
    height,
    value,
    dataIsFetched,
    clickDropDownArrowButton,
    changeValue,
    dropdownStatus,
    setDropdownStatus,
    shouldFocusOnInput,
    setShouldFocusOnInput,
    valueHighlightedInList,
    verifyChosenElement,
    chosenValueIsCorrect
}:IBaseDropDown) => {

    const inputRef: RefObject<HTMLInputElement> = useRef(null)
    const [dropdownWasNotPreviouslyOpen,setDropdownWasNotPreviouslyOpen] = useState(true)

    useEffect(() => {
        if(shouldFocusOnInput && inputRef != null){
            inputRef.current && inputRef.current.focus()
    }
},[shouldFocusOnInput])
    const valueForInputField = () => {
        if(!valueHighlightedInList) return value
        if(valueHighlightedInList.length != 0) {
            console.log("returning value highlighted in list")
            console.log(valueHighlightedInList)
            return valueHighlightedInList
        }
        return value
    }
    const valueChanged = (newValue:string) => {
        console.log("old value : " + value)
        console.log("new value : " + newValue)
        //Input was empty, now typed something that is not of length 0
        if(value.trim().length === 0 && newValue.trim().length != 0){
            //If dropdown is not open, open it
            if(!dropdownStatus){
                setDropdownWasNotPreviouslyOpen(false)
                setDropdownStatus(true)
            }
            else{
                setDropdownWasNotPreviouslyOpen(false)
            }
            changeValue(newValue)
            verifyChosenElement()    
        }
        if(newValue.length === 0){
            //retain focus on input if user deleted last string - so that input is empty
            if(value.length !== 0){
                setShouldFocusOnInput(true)
            }
            changeValue(newValue)
            setDropdownWasNotPreviouslyOpen(true)
            setDropdownStatus(false)
            verifyChosenElement()
        }
        else{
            if(!dropdownStatus){
                setDropdownWasNotPreviouslyOpen(true)
                setShouldFocusOnInput(true)
                setDropdownStatus(true)
            }    
            changeValue(newValue)
            verifyChosenElement()
        }
    }

    if(dataIsFetched){
        return(
            <div className={`${chosenValueIsCorrect ? 'outline-secondary outline-1 outline rounded-[17px]' : 'outline-darker-secondary-2 outline-1 outline rounded-[17px]'} relative flex h-[44px] flex-row items-center align-stretch
            bg-white focus-within:outline-1 focus-within:outline focus-within:outline-primary overflow-hidden rounded-[17px]`} tabIndex={0}>
                <input className="w-full text-right mr-8 bg-white rounded-sm focus:outline-none pr-5"
                 type="search" value={valueForInputField()} onChange={(e) => valueChanged(e.target.value)} ref={inputRef}/>
                <div className="flex flex-row items-center justify-center absolute right-2 min-h-full bg-white">
                    <button className="cursor-pointer" onClick={() => clickDropDownArrowButton()}><DropDownArrowIcon height={height}/></button>
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="relative flex h-[44px] flex-row items-center align-stretch bg-white focus-within:outline-4 focus-within:outline focus-within:outline-secondary rounded-[17px]" tabIndex={0}>
                <input className=" w-full bg-white text-right mr-8 focus:outline-none rounded-[17px] pr-5"
                 type="search" value={value} onChange={(e) => valueChanged(e.target.value)}/>
                <div className="absolute right-2 min-h-full bg-white flex flex-row items-center justify-center">
                    <DropDownArrowIcon height={height}/>
                </div>
        </div>
    )
}
  }

export default BaseDropDown