import axios from 'axios'
import {useRef, useState,useReducer} from 'react'
import { BASE_URL } from '../../../constants/urls'
import { DropDownArrowIcon } from '../../../icons/dropdownArrowIcon'
import { useAppDispatch, useAppSelector } from '../../../reduxHooks'
import Chat from '../../../sharedComponents/chat/chat'
import { Conversation } from '../../../state/messaging/messagingZodSchemas'
import { GetUserInfoApiResponse, Portfolio, StockDeal } from './adminMainPageSchema'
import DealsDropdown from './dealsDropdown'
import PortfolioVisualizer from './portfolioVisualizer'
import useAnimatedDropdown from './useAnimatedDropdown'
import { access } from 'fs'

export type UserInfo = {
    username: string,
    userId: number,
    stockDeals: StockDeal[],
    conversation?: Conversation,
    portfolio?:  Portfolio | null,
}

export default ({userId,conversation,stockDeals,username,portfolio}:UserInfo) => {
    const sectionRef = useRef<HTMLUListElement>(null)
    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const {handleClick,open} = useAnimatedDropdown({dropdownArrowRef:dropdownArrowRef,dropdownRef:sectionRef})
    const reduxDispatch = useAppDispatch() 
    const accessToken = useAppSelector(state => state.users.accessToken) as string
    const ownId = useAppSelector(state => state.users.userId) as number
    const [balance,setBalance] = useState(0)
    
    return(
        <div className="w-full h-auto flex flex-col justify-center bg-secondary-2 my-[40px]">
            <h3 className="text-white text-center text-[36px] font-medium mb-5 bg-secondary p-3 rounded-[17px]">{username}</h3>
            {
                 open ?
                 <ul className="w-full" ref={sectionRef}>
                    <li className="flex flex-col justify-center items-center">
                        {conversation === undefined ? 
                        <button className="text-center text-white my-[18px] p-4 font-medium text-lg bg-primary rounded-[17px]"
                        onClick={() => {
                            startConversation(accessToken,ownId,userId)
                        }}>Start Conversation</button>
                        :
                         <Chat conversationId={conversation.conversationId} messages={conversation.messages === undefined ? [] : conversation.messages} otherUser={username}/>}
                    </li>
                    <li className="w-full bg-yellow py-2">
                        <DealsDropdown deals={stockDeals} name={username}/>
                    </li>
                    <li className="w-full bg-blue py-2">
                        {
                        (portfolio === undefined || portfolio === null) ? 
                        <section>
                            <h3 className="text-center text-white my-[40px] font-medium text-[18px]">No portfolio attached</h3>
                            <form className="grid grid-cols-2" onSubmit={(e) => {
                                e.preventDefault()
                                createPortfolio({accessToken:accessToken,userId:userId,balance:balance})}}>
                                <label className="text-white col-start-1 col-span-1 row-start-1 row-span-1">Balance</label>
                                <input type="number" onChange={(e) => handleInputChange(e.target.value)} className="col-start-2 col-span-1 row-start-1 row-span-1 rounded-[17px] py-2 px-4 focus:outline-none"></input>
                                <button className="my-[10px] col-start-1 col-span-2 row-start-2 row-span-1 bg-primary py-2 rounded-[17px] mx-4">Create Portfolio</button>
                            </form>
                        </section> 
                        :
                       <PortfolioVisualizer 
                        portfolio={portfolio}
                        username={username} />
                        }
                    </li>
                 </ul>
                 :
                 null
            } 
            <DropDownArrowIcon height={30} onClickCallback={() => handleClick()} ref={dropdownArrowRef}/>
        </div> 
    )

    function handleInputChange(newValue:string){
        const regex = /^[0-9\b]+$/
        if(regex.test(newValue)) setBalance(parseInt(newValue))
    }

    async function createPortfolio(
        {accessToken,userId,balance}:
        {
            accessToken:string,
            userId:number,
            balance: number
        }){

        const createPortfolioResponse = await axios({
            method:'post',
            url:BASE_URL + 'admin/createPortfolio',
            withCredentials:true,
            headers:{
                Authorization:accessToken,
            },
            data:{
                userId: userId,
                balance: balance,
            }
        })
        const reduxDispatch = useAppDispatch()
        reduxDispatch({type:'UPDATE_USER_DATA'})
    }

    async function startConversation(accessToken:string,ownId:number,otherPersonId:number){

        const apiResponse = await axios({
            method: 'post',
            url: BASE_URL + 'messaging/startConversation',
            headers:{
                Authorization: accessToken
            },
            withCredentials:true,
            data:{
                firstUserId: ownId,
                secondUserId: otherPersonId,
            }
        })
        reduxDispatch({type:'UPDATE_CONVERSATIONS'})
    }
}
