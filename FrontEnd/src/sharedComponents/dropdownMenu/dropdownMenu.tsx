import { useState } from "react";
import { DropDownArrowIcon } from "../../icons/dropdownArrowIcon";



interface IDropDownMenu{
    items:string[],
    chosenValue?: string,
    setChosenValue: (newValue:string) => void,
}

const DropDownMenu = ({items,chosenValue,setChosenValue}:IDropDownMenu) => {
    const [open,setOpen] = useState(false)
    const clickDropDownArrowButton = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setOpen(!open)
    }
    return(
    <div className="relative bg-white w-full min-w-0 flex-grow-0 basis-1/2">
    <div className="flex flex-row w-full align-stretch justify-center items-center">
        <input readOnly className="w-full hover:outline-none text-center focus:outline-none cursor-defaul mr-[20px]" type="text" value={chosenValue ? chosenValue : items[0]}/>
        <button className="absolute right-2" onClick={(e) => clickDropDownArrowButton(e)}>
        <DropDownArrowIcon height={20}/>    
        </button>
    </div>
    {
    open && 
    <ul className="min-w-0 basis-1/2 overflow-auto">
            {items.map((item,index) => {
                return index === items.length - 1 
                ?
                //Last item
                <li className="w-auto h-[30px] right-[20px] bg-gray-300 content-end  text-center overflow-auto">{item}</li>
                :
                <li className="w-auto h-[30px] bg-gray-300 content-end overflow-auto text-center after:content-[''] after:w-full
                after:bg-primary/40 after:rounded-sm hover:bg-secondary-2/10 hover:cursor-pointer after:h-[1.5px] 
                after:list-item after:box-content">{item}</li>
            })}
    </ul>
    }
    
    </div>
    )
}

export default DropDownMenu;