import {useRef, useState} from 'react'
import { DropDownArrowIcon } from '../../../icons/dropdownArrowIcon'
import Chat from '../../../sharedComponents/chat/chat'
import { Conversation, Message } from '../../../state/messaging/messagingZodSchemas'
import { Portfolio, StockDeal } from './adminMainPageSchema'
import DealsDropdown from './dealsDropdown'
import MessageDropdown from './messageDropdown'
import PortfolioVisualizer from './portfolioVisualizer'
import useAnimatedDropdown from './useAnimatedDropdown'



export type UserInfoAdmin = {
    username: string,
    userId: number,
    stockDeals: StockDeal[],
    conversation?: Conversation,
    portfolio?:  Portfolio
}

export default ({userId,conversation,stockDeals,username,portfolio}:UserInfoAdmin) => {
    const sectionRef = useRef<HTMLUListElement>(null)
    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const {handleClick,open} = useAnimatedDropdown({dropdownArrowRef:dropdownArrowRef,dropdownRef:sectionRef}) 
    console.log({conversation})
    
    return(
        <div className="w-full h-auto flex flex-col justify-center bg-secondary-2 my-[40px]">
            <h3 className="text-white text-center text-[36px] font-medium">{username}</h3>
            {
                 open ?
                 <ul className="w-full" ref={sectionRef}>
                    <li>
                        {conversation === undefined ? <h2 className="text-center text-white my-[18px] font-medium text-[18px]">No conversation found</h2> : <Chat conversationId={conversation.conversationId} messages={conversation.messages === undefined ? [] : conversation.messages} otherUser={username}/>}
                    </li>
                    <li className="w-full bg-yellow py-2">
                        <DealsDropdown deals={stockDeals} name={username}/>
                    </li>
                    <li className="w-full bg-blue py-2">
                        {
                        portfolio === undefined ? <h3 className="text-center text-white my-[40px] font-medium text-[18px]">No stocks in this portfolio</h3> :
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
}
