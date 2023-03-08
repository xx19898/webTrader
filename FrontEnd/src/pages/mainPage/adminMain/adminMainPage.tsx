import gsap,{Bounce} from "gsap"
import { useEffect, useState,useRef} from "react"
import { SearchIcon } from "../../../icons/searchIcon"
import { useAppSelector,useAppDispatch } from "../../../reduxHooks"
import { DealStatus } from "../../../sharedComponents/portfolioManager/portfolioDataSchemas"
import DealsDropdown from "./dealsDropdown"
import MessageDropdown from "./messageDropdown"
import UserInfoVisualizer, { UserInfoAdmin } from "./userInfoVisualizer"

const pending: DealStatus = 'PENDING'




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

                    }
                    </ul>
                </section>
            </section>
        </div>
    )
}