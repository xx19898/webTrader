import { forwardRef } from "react"

interface IDropDownIcon{
    height : number,
}


export const DropDownArrowIcon = forwardRef(function dropdownArrowIcon({height}:IDropDownIcon,ref:React.LegacyRef<SVGSVGElement>){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" height={height} viewBox="0 0 410.31 234.84" ref={ref}>
      <path fill="none" stroke="#222323" stroke-miterlimit="10" stroke-width="42" d="m14.85 14.92 205 205"/>
      <path fill="none" stroke="#222323" stroke-miterlimit="10" stroke-width="42" d="M190.32 219.99 395.46 14.85"/>
    </svg>
  )
})
