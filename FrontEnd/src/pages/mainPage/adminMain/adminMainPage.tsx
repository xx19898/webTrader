import gsap,{Bounce} from "gsap"
import { useEffect, useState,useRef} from "react"
import { SearchIcon } from "../../../icons/searchIcon"
import { useAppSelector,useAppDispatch } from "../../../reduxHooks"
import { DealStatus } from "../../../sharedComponents/portfolioManager/portfolioDataSchemas"
import DealsDropdown from "./dealsDropdown"
import MessageDropdown from "./messageDropdown"
import UserInfoVisualizer, { UserInfoAdmin } from "./userInfoVisualizer"

const pending: DealStatus = 'PENDING'

const data:UserInfoAdmin[] = [{
    username: "user1",
    messages: [{
        username:"user1",
        message:"Hi, could you please book me some time this week?",
        replyTo:{
            username:"user1",
            date: new Date(2020,10,12),
            id:39,
            replyTo:undefined,
            message:"Hello! How's it been?"
    },
    date:new Date(2022,10,10),id:1}],
    stockDeals:[
        {
            id:1,symbol:"AAPL",quantity:4,stockPriceAtTheAcquirement:200,dealStatus: 'PENDING' as const,createdDate:new Date(),operationType: 'BUY' as const}
    ],
    balance: 498.3,
    creationDate: new Date(),
    },
    {
    username:"user2",
    messages: [{username:"veronica",message:"Hello, how are you doing today?",date:new Date(2022,9,4),id:2,replyTo:undefined},{username:"user2",message:"What do you recommend on buying today?",date:new Date(2022,10,8),id:3,replyTo:undefined}],
    stockDeals:[{
        id:2,symbol:"GGL",quantity: 2,stockPriceAtTheAcquirement:750,dealStatus: 'PENDING' as const,createdDate: new Date(),operationType: 'SELL',
    }],
    balance: 1000.3,
    creationDate: new Date(),
}

]
//TODO: fix the rest of the admin page visuals, test admin role authorization on backend, create admin user, try to start a chat between the created user and the admin
export default () => {
    const searchIconRef = useRef<SVGSVGElement>(null)
    const [searchedUsername,setSearchedUsername] = useState("")

    useEffect(() => {
        gsap.fromTo(searchIconRef.current,{scale:0},{scale:1,duration:0.5,ease: Bounce.easeOut})
    },[])
    return(
        <div className="overflow-auto w-auto h-auto min-h-full bg-secondary-2 flex-col flex justify-start items-center">
            <header className="flex justify-center items-center">
                <h1 className="mt-10 ml-5 font-poppins font-bold text-xl text-white text-center">
                    Welcome to the admin dashboard
                </h1>
            </header>
            <section className="mt-10 h-auto w-[80%] flex-col flex justify-center items-center">
            <form className="relative w-[80%]">
                <div className="absolute top-2 left-2">
                <SearchIcon height={30} ref={searchIconRef} />
                </div>
            <input
            onChange={(e) => setSearchedUsername(e.target.value)} 
            className="block bg-transparent indent-10 rounded-lg w-full mx-auto h-[3rem] px-2 border border-solid border-darker-secondary-2 focus:outline-none text-white" placeholder="Search for user">
            </input>
            </form>
                <section className="h-auto mt-5 w-full min-h-[40px] border border-solid border-darker-secondary-2 rounded-md">
                    <ul className="flex flex-col justify-center items-center">
                    {
                        data.filter(user => user.username.includes(searchedUsername)).map(user => {
                            return(
                                <>
                                <div className="bg-darker-secondary-2 first:bg-transparent w-[80%] h-2 mx-auto">
                                </div>
                                <li className="my-5 w-full">
                                    <UserInfoVisualizer 
                                    balance={user.balance}
                                    creationDate={user.creationDate}
                                    messages={user.messages}
                                    stockDeals={user.stockDeals}
                                    username={user.username}
                                    />
                                </li>
                                </>
                            )
                        })
                    }
                    </ul>
                </section>
            </section>
        </div>
    )
}