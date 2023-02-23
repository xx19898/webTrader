import { forwardRef } from 'react'


interface SearchIconProps{
    height: number
  }
  
  export const SearchIcon = forwardRef(function SearchIcon(props:SearchIconProps,ref:React.LegacyRef<SVGSVGElement>){
      return (
      <svg xmlns="http://www.w3.org/2000/svg" ref={ref} data-name="Layer 1" width={293.14/269.8 * props.height} height={props.height} viewBox="0 0 293.14 269.8">
        <circle cx="75.18" cy="75.18" r="67.68" fill="none" stroke="#a0a09d" stroke-miterlimit="10" stroke-width="15"/>
        <path fill="none" stroke="#a0a09d" stroke-miterlimit="10" stroke-width="15" d="m126.69 127.7 161.62 136.37"/>
      </svg>
      );
  })