import { SearchIcon } from "../../../icons/searchIcon"
import UserInfoVisualizer from "./userInfoVisualizer"
import{forwardRef} from 'react'
import { GetUserInfoApiResponse } from "./adminMainPageSchema"
import { Conversation } from "../../../state/messaging/messagingZodSchemas"

export type IAdminMainPage = {
    setSearchedUsernameCallback: (update: string | ((prevState: string) => string)) => void,
    searchedUsername: string
    usersData: GetUserInfoApiResponse,
    conversations: Conversation[],
}

export const AdminMainPage = forwardRef(function AdminMainPage(props:IAdminMainPage,ref:React.ForwardedRef<SVGSVGElement>){
    
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
                <SearchIcon height={30} ref={ref} />
                </div>
            <input
            onChange={(e) => {
                props.setSearchedUsernameCallback(e.target.value)}}
            className="block bg-transparent indent-10 rounded-lg w-full mx-auto h-[3rem] px-2 border border-solid border-darker-secondary-2 focus:outline-none text-white" placeholder="Search for user">
            </input>
            </form>
                <section className="h-auto mt-5 w-full min-h-[40px] rounded-md">
                    <ul className="flex flex-col justify-center items-center">
                    {
                        props.usersData.filter(user => {
                            if(props.searchedUsername.length === 0) return true
                            return user.username.trim().slice(0,props.searchedUsername.length) === props.searchedUsername
                        }).map(userData => {
                            return <UserInfoVisualizer 
                                    userId={userData.id}
                                    username={userData.username}
                                    conversation={props.conversations ? findConversation(userData.username,props.conversations) : undefined}
                                    stockDeals={userData.stockDeals}
                                    portfolio={userData.portfolio}/>
                        })
                    }
                    </ul>
                </section>
            </section>
        </div>
    )

    function findConversation(username:string,conversations: Conversation[]){
        const result = conversations.find(conversation => {
  if(conversation == null || conversation == undefined) return false
            console.log({conversation})
            console.log({username})
            console.log({includes:conversation.participants.map(participant => participant.participantName).includes(username)})
            return conversation.participants.map(participant => participant.participantName).includes(username)
        })

        console.log({result})
        if(result == null) return undefined
        return result
    }
})