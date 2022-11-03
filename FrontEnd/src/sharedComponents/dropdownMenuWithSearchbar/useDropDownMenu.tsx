import React, { useEffect, useMemo, useRef, useState } from "react";

export function getMatchingListElements (list: string[], stringToMatchAgainst : string){
    return list.filter( (element) => {
        const lengthOfTheString = stringToMatchAgainst.trim().length
        const correspondingPartOfElement = element.trim().substring(0,lengthOfTheString)
        return stringToMatchAgainst === correspondingPartOfElement
    })
}

interface IUseDropDownMenu {
    list:string[],
    setChosenElement: (newChosenElement:string) => void,
    chosenElement: string,
    isCorrect: boolean,
    setIsCorrect: (newStatus:boolean) => void,
}

const useDropDownMenu = ({list,chosenElement,setChosenElement,isCorrect,setIsCorrect}:IUseDropDownMenu) => {
        const [open,setStatusOfDropdown] = useState(false)
        const [shouldFocusOnInput,setShouldFocusOnInput] = useState(false)
        const [valueHoveredInList,setValueHoveredInList] = useState("")
        
        const wrapperRef = useRef<HTMLDivElement>(null);

        const handleHideDropdown = (event: KeyboardEvent) => {
            if(event.key === 'Escape'){
                setStatusOfDropdown(false)
            }
        }

        const filteredData = useMemo(() => {
            return chosenElement.length === 0 ?  list :  getMatchingListElements(list,chosenElement)
        },[chosenElement,list])
        
        const verifyMemo = useMemo(() => {
            return list.includes(chosenElement)
        },[chosenElement])

        const verifyChosenElement = () => {
            if(verifyMemo) setIsCorrect(true)
            else setIsCorrect(false)
        }

        const clickOnListItem = (chosenVal:string) => {
            setChosenElement(chosenVal)
            setIsCorrect(true)
            setStatusOfDropdown(false)
        }

        const handleClickOutside = (event: Event) => {
            if(
                wrapperRef.current && 
                !wrapperRef.current.contains(event.target as Node)
            ){
                setStatusOfDropdown(false)
            }
        }

        useEffect(() => {
            document.addEventListener('keydown',handleHideDropdown, true)
            document.addEventListener('click',handleClickOutside, true)
            return () => {
                document.removeEventListener('keydown',handleHideDropdown, true)
                document.removeEventListener('click',handleClickOutside, true)
            }
        })

        function clickArrowButton(){
            open === true ? setStatusOfDropdown(false) : setStatusOfDropdown(true)
        }

        return({
            dropDownStatus: open,
            setStatusOfDropdown: setStatusOfDropdown,

            chosenElement: chosenElement,
            setChosenElement: setChosenElement,

            dropdownRef: wrapperRef,
            clickArrowButton: clickArrowButton,

            filteredData: filteredData,

            shouldFocusOnSymbolInput: shouldFocusOnInput,
            setShouldFocusOnSymbolInput: setShouldFocusOnInput,

            valueHighlightedInList: valueHoveredInList,
            setValueHighlightedInList: setValueHoveredInList,

            verifyChosenElement: verifyChosenElement,

            clickOnListItem: clickOnListItem
        })
}

export default useDropDownMenu