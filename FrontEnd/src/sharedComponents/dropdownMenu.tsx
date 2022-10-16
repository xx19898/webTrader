import { useState } from "react"
import { DropDownArrowIcon } from "../icons/dropdownArrowIcon"

interface IDropDownMenu{
    dataToVisualise: String[],
    passUpTheChosenValue: (newValue:string) => void,
}
/* make optional rendering to wait for data, if datatovisualise.size is 0, then only give blank 
text field where it stands that symbols are not yet ready to be shown */
export const DropDownTextMenu: React.FC<IDropDownMenu> = ({dataToVisualise,passUpTheChosenValue}) => {
    const [open,setStatusOfDropdown] = useState(false)
    const [chosenElement,setChosenElement] = useState("")
    return(
        <div className="flex flex-row">
            <div>
                <i><DropDownArrowIcon height={10}/></i>
                <input type="search"/>
                </div>
            <ul className="w-auto h-64">
                {
                dataToVisualise.map( element => <li>{element}</li>)
                }
            </ul>
        </div>
    )
    }