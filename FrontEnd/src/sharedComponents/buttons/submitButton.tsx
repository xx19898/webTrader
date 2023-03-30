


interface ISubmitButton {
    active: boolean,
    text: string,
    marginTop: number,
}

export default ({active,text,marginTop}:ISubmitButton) => {

    return(
        <button disabled={!active} className="font-poppins font-semibold text-white w-auto h-auto py-2 px-6 text-center mx-auto bg-gradient-to-tr via-primary/80 from-secondary to-primary border-solid border-[2px] border-white rounded-[17px]" style={{marginTop:`${marginTop}rem`}}>
            {text}
        </button>
    )
}