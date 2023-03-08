import { isTypedArray } from "util/types"

interface IStartConvoIcon{
    height:number,
    callback: () => void
}
export default ({height,callback}:IStartConvoIcon) => {


    return(
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 580.65 591.93">
                <path fill="#fff" stroke="#3a3930" stroke-linejoin="round" stroke-width="9" d="M162.15 179.4h414v243h-414z"/>
                <path fill="none" stroke="#3a3930" stroke-linejoin="round" stroke-width="9" d="m205.23 389.34 327.85-176.88"/>
                <path fill="none" stroke="#3a3930" stroke-linejoin="round" stroke-width="9" d="m196.02 204.8 324.29 180"/>
                <path fill="none" stroke="#3a3930" stroke-linejoin="round" stroke-width="9" d="M162.15 179.4h354"/>
                <path fill="none" stroke="#3a3930" stroke-linejoin="round" stroke-width="9" d="M576.15 179.4 358.17 6.4"/>
                <path fill="none" stroke="#3a3930" stroke-linejoin="round" stroke-width="9" d="M162.15 179.4 361.6 3.37"/>
                <path fill="none" stroke="#3a3930" stroke-linecap="round" stroke-linejoin="round" stroke-width="25" d="m132.5 338.1 1.33 241.33"/>
                <path fill="none" stroke="#3a3930" stroke-linecap="round" stroke-linejoin="round" stroke-width="25" d="M253.83 458.1 12.5 459.43"/>
        </svg>
    )
}