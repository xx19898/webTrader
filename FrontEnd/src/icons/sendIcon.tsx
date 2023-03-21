
interface ISendIcon{
    callback: () => void,
    height: number
}
export default ({callback,height}:ISendIcon) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => { e.preventDefault()
                                                                  callback()} }
             data-name="Layer 1" height={height} viewBox="0 0 379.64 414.72">
            <path fill="#fff" stroke="#3b3b3f" stroke-miterlimit="10" stroke-width="7" d="m6.97 267.59 100.72 46.43 207.28 95.57 60-402-368 260z"/>
            <path fill="#969696" stroke="#2b2b28" stroke-linejoin="round" stroke-width="7" d="m129.95 323.91 9.95 47.02 37.59-25.1"/>
            <path fill="#969696" stroke="#3e3e44" stroke-linejoin="round" stroke-width="7" d="M374.97 7.59 131.64 322.92"/>
        </svg>
    )
}