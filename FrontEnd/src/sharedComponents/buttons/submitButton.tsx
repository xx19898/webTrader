


interface ISubmitButton {
    active: boolean,
    text: string,
    marginTop: number
}

export default ({active,text,marginTop}:ISubmitButton) => {

    return(
        <button className="font-poppins font-semibold text-white w-auto h-auto py-2 px-6 text-center mx-auto bg-primary border-solid border-[2px] border-white rounded-sm" style={{marginTop:`${marginTop}rem`}}>
            {text}
        </button>
    )
}