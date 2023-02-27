import { forwardRef, useState } from "react"
import SendIcon from "../../icons/sendIcon"
import ReplyArrowIcon from "../../icons/replyArrowIcon"


export type Message = {
    message:string,
    username: string,
    date:Date,
    id: number,
    replyTo: Message | undefined
}

export type IMessageDropdown = {
    name:string,
    messages:Message[],
}


export default  ({messages,name}:IMessageDropdown) => {
    const [inputHeight,setInputHeight] = useState(34)
    const [typedMessage,setTypedMessage] = useState<string>("")


    return(
            <>
            <ul className="relative bg-secondary-2 w-full h-auto mb-0 pb-4 grid grid-cols-2 border-solid border border-darker-secondary-2" >
                    {messages.map(message => {
                        return(
                                 <li className={name === message.username ? "col-start-1 col-end-1 h-auto relative bg-transparent p-4 text-center w-full ml-[2rem] mr-2 rounded-md my-2 flex flex-col justify-center items-center" : "col-start-2 col-end-2 h-auto relative bg-transparent p-4 text-center w-[60%] ml-[2rem] mr-2 rounded-md my-2 flex flex-col justify-center items-center"}>

                                {
                                    message.replyTo != undefined ? 
                                    <div className="bg-secondary p-2 w-[80%] ml-[2rem] rounded-lg">
                                        <span>{message.replyTo?.message}</span>
                                    </div> : null
                                }
                                <article className={name === message.username ? "relative bg-primary p-4 text-center rounded-md w-[80%] ml-[2rem] my-1 flex flex-col justify-center items-center"
                                                                                 :
                                                                                "relative bg-darker-secondary-2 p-4 text-center rounded-md w-[80%] ml-[2rem] my-1 flex flex-col justify-center items-center"}>
                                {
                                    message.replyTo != undefined ? 
                                    <div className="absolute right-1 top-1">
                                    <ReplyArrowIcon height={20} />
                                    </div> : null
                                }    
                                <p className="font-normal text-white">{message.message}</p>
                                <i className="relative left-7 text-sm font-light">
                                    {message.date.toLocaleString() }
                                </i>
                                </article>  
                            </li>
                        )
                    })}
            </ul>
            <li className="block mx-auto relative w-[60%]">
                    <textarea placeholder="Type your message..." className="flex justify-center items-center rounded-lg w-full py-2 indent-4 pr-8 resize-none focus:outline-none leading-5" style={{height: `${inputHeight}px`}} onChange={(e) => handleInput(e.target.value)}></textarea>
                    <div className="absolute right-2 bottom-[2px]">
                    <SendIcon callback={() => SendMessage(typedMessage)} height={30}  />
                    </div>
            </li>
            </>
    )

    function SendMessage(message:string){
        if(message.length != 0){
            console.log(message)
        }
    }

    function replyToMessage(message:string){
        
    }

    function calcHeight(value:string) {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        console.log(value.length)
        console.log({numberOfLineBreaks})
        // min-height + lines x line-height + padding + border
        let numberOfLines = Math.trunc(value.length / 39)
        if(numberOfLines === 1){
            numberOfLines = 0
        }
        console.log({numberOfLines})  
        let newHeight = 20 + numberOfLineBreaks * 20 + numberOfLines * 20 + 12 + 2;
        return newHeight;
    }

    function handleInput(newValue:string){
        setTypedMessage(newValue)
        setInputHeight(calcHeight(newValue))
    }
}