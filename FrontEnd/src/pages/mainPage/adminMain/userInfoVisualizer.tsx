import {useState} from 'react'
import { Message } from '../../../sharedComponents/chat/chat'
import { StockDeals } from '../../../sharedComponents/portfolioManager/stockDealVisualizer'
import DealsDropdown from './dealsDropdown'
import MessageDropdown from './messageDropdown'



export type UserInfoAdmin = {
    username: string,
    creationDate: Date,
    balance: number,
    stockDeals: StockDeals,
    messages: Message[]
}

export default (userInfo:UserInfoAdmin) => {
    const {balance,creationDate,messages,stockDeals,username} = userInfo
    const openDropdown = useState<boolean>(false) 

    //TODO: Implement to the end and test
    return(
        <div className="w-full h-auto flex flex-col justify-center">
            {
                 openDropdown ? 
                 <>
                 <section className="grid grid-cols-2 gap-4 mx-auto">
                 <h2 className="font-poppins font-semibold text-lg text-white ">Username</h2><span className="text-white font-poppins ">{username}</span>
                 <h2 className="font-poppins font-semibold text-lg text-white ">Creation Date</h2><span className="text-white font-poppins ">{creationDate.toDateString()}</span>
                 <h2 className="font-poppins font-semibold text-lg text-white ">Balance</h2><span className="text-white font-poppins ">{balance + " $"}</span>
                 </section>
                 <section className="w-full">
                 <MessageDropdown messages={messages} name={username}/>
                 <DealsDropdown deals={stockDeals} name={username}/>
                 </section>
                 </>
                 :
                 null
            }
        </div> 
    )
}
