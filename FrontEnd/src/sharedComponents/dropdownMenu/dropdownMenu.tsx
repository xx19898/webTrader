import { useState } from "react";
import { DropDownArrowIcon } from "../../icons/dropdownArrowIcon";
import UseDropDownMenu from "./useDropdownMenu";



interface IDropDownMenu{
    items:string[],
    chosenValue?: string,
    setChosenValue: (newValue:string) => void,
}

const DropDownMenu = ({items,chosenValue,setChosenValue}:IDropDownMenu) => {
    const {open,setOpen,wrapperRef} = UseDropDownMenu()
    const clickDropDownArrowButton = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setOpen(!open)
    }
    const chooseTabFromDropdown = (newValue:string) => {
        setChosenValue(newValue);
        setOpen(false);
    }
    return(
    <div ref={wrapperRef} className="relative bg-white w-full h-[44px]  focus-within:outline-1 focus-within:outline-primary focus:outline-1 focus:outline-primary rounded-[17px]">
    <div className="relative bg-white w-full h-[44px]  focus-within:outline-1 focus-within:outline-primary flex flex-row align-stretch justify-center items-center drop-shadow-md rounded-[17px]">
        <input readOnly  className="w-full hover:outline-none text-center focus:outline-none cursor-default mr-[20px] rounded-[17px]" type="text" value={chosenValue ? chosenValue : items[0]}/>
        <button className="absolute right-2" onClick={(e) => clickDropDownArrowButton(e)}>
        <DropDownArrowIcon height={20}/>    
        </button>
    </div>
    {
    open && 
    <ul className="min-w-0 basis-1/2 overflow-auto relative z-10 rounded-[17px]">
            {items.map((item,index) => {
                return index === items.length - 1 
                ?
                //Last item
                <li className="w-auto h-[30px] right-[20px] bg-gray-300 content-end  text-center overflow-hidden
                hover:bg-primary hover:cursor-pointer" onClick={(e) => chooseTabFromDropdown(item)}>{item}</li>
                :
                <li className="w-auto h-[30px] bg-gray-300 content-end overflow-hidden text-center after:content-[''] after:w-full
                after:bg-primary/40 after:rounded-sm hover:bg-primary hover:cursor-pointer after:h-[1.5px] 
                after:list-item after:box-content" onClick={(e) => chooseTabFromDropdown(item)}>{item}</li>
            })}
    </ul>
    }
    
    </div>
    )
}

export default DropDownMenu;