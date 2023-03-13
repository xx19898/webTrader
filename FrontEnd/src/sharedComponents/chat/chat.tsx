import { forwardRef, useState,useEffect } from "react"
import SendIcon from "../../icons/sendIcon"
import ReplyArrowIcon from "../../icons/replyArrowIcon"
import { useAppSelector } from "../../reduxHooks"
import axios from "axios"
import { BASE_URL } from "../../constants/urls"
import { Message } from "../../state/messaging/messagingZodSchemas"



export type IMessageDropdown = {
    otherUser:string,
    messages:Message[],
    conversationId: number,
}

export default  ({messages,otherUser,conversationId}:IMessageDropdown) => {
    useEffect(() => {

    },[true])

    const loggedInUser = useAppSelector(state => state.users.loggedUser)
    const [inputHeight,setInputHeight] = useState(34)
    const [typedMessage,setTypedMessage] = useState<string>("")


    return(
            <>
            <ul className="relative bg-secondary-2 w-full min-h-[100px] h-auto mb-0 pb-4 grid grid-cols-2 border-solid border border-darker-secondary-2" >
                    {messages.map(message => {
                        return(
                                 <li className={loggedInUser === message.senderUsername ? "col-start-1 col-end-1 h-auto relative bg-transparent p-4 text-center w-full ml-[2rem] mr-2 rounded-md my-2 flex flex-col justify-center items-center" : "col-start-2 col-end-2 h-auto relative bg-transparent p-4 text-center w-[60%] ml-[2rem] mr-2 rounded-md my-2 flex flex-col justify-center items-center"}>

                                {
                                    message.replyTo != undefined ? 
                                    <div className="bg-secondary p-2 w-[80%] ml-[2rem] rounded-lg text-white">
                                        <span>{message.replyTo?.message}</span>
                                    </div> : null
                                }
                                <article className={loggedInUser === message.senderUsername ? "relative bg-primary p-4 text-center rounded-md w-min-[80%] w-fit ml-[2rem] my-1 flex flex-col justify-center items-center"
                                                                                 :
                                                                                "relative bg-darker-secondary-2 p-4 text-center rounded-md w-min-[80%] w-fit ml-[2rem] my-1 flex flex-col justify-center items-center"}>
                                {
                                    message.replyTo != undefined ? 
                                    <div className="absolute right-1 top-1">
                                    <ReplyArrowIcon height={20} />
                                    </div> : null
                                }    
                                <p className="font-normal text-white">{message.message}</p>
                                <i className="relative left-3 text-sm font-light">
                                    {message.date.toLocaleString()}
                                </i>
                                </article>  
                            </li>
                        )
                    })}
            </ul>
            <li className="block mx-auto relative w-[60%]">
                    <textarea placeholder="Type your message..." className="flex justify-center items-center rounded-lg w-full py-2 indent-4 pr-8 resize-none focus:outline-none leading-5" style={{height: `${inputHeight}px`}} onChange={(e) => handleInput(e.target.value)}></textarea>
                    <div className="absolute right-2 bottom-[2px]">
                    <SendIcon callback={() => sendMessage(typedMessage)} height={30} />
                    </div>
            </li>
            </>
    )

    async function sendMessage(message:string){
        const apiResponse = await axios.post(`${BASE_URL}messaging/sendMessage`,{
            conversationId,
            message
        })
        console.log(apiResponse.status)
    }

    function replyToMessage(message:string){
        
    }

    function calcHeight(value:string) {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        // min-height + lines x line-height + padding + border
        let numberOfLines = Math.trunc(value.length / 39)
        if(numberOfLines === 1){
            numberOfLines = 0
        }
        let newHeight = 20 + numberOfLineBreaks * 20 + numberOfLines * 20 + 12 + 2;
        return newHeight;
    }

    function handleInput(newValue:string){
        setTypedMessage(newValue)
        setInputHeight(calcHeight(newValue))
    }
}