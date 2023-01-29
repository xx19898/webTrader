import gsap from "gsap"
import { useEffect, useRef } from "react"
import DealsDropdown from "./dealsDropdown"
import MessageDropdown from "./messageDropdown"

const data = [{
    user: "user1",
    messages: [{message:"Hi, could you please book me some time this week?",date:new Date(2022,10,10)}],
    deals:[
        {stockName:"AAPL",quantity:4,totalPrice:800,priceOfStock:200}
    ]
},{
    user:"user2",
    messages: [{message:"Hello, how are you doing today?",date:new Date(2022,9,4)},{message:"What do you recommend on buying today?",date:new Date(2022,10,8)}],
    deals:[{
        stockName:"GGL",quantity: 2, totalPrice:1500,priceOfStock:750
    }]
}

]

export default () => {
    const textDecorationRef = useRef<HTMLDivElement[]>([])
    useEffect(() => {
        gsap.fromTo(textDecorationRef.current,{scaleX:0},{scaleX:1,duration:0.5,stagger:0.2})
    },[])
    return(
        <div className="overflow-auto w-auto h-auto min-h-full bg-secondary-2">
            <header className="flex justify-center items-center">
                <h1 className="mt-10 ml-5 font-poppins font-bold text-xl text-white text-center">
                    Welcome to the admin dashboard
                </h1>
            </header>
                <section className=" w-auto h-auto mx-4 mt-10 mb-[10rem] text-white flex flex-col justify-center items-center">
                            <h2 className=" w-auto mt-10 text-center font-semibold text-lg ">
                                Messages
                            </h2>
                            <div ref={element => {textDecorationRef.current[0] = element as HTMLDivElement}} className="w-[6rem] h-1 mt-1 bg-primary"></div>
                        
                            <section className="w-[80%]">
                                {   
                                    data.map( (userEntry) => {
                                        return <MessageDropdown messages={userEntry.messages} name={userEntry.user} />
                                    })
                                }
                            </section>
                            

                            <h3 className="font-semibold text-lg mt-10">
                                Deals
                            </h3>
                            <div ref={element => {textDecorationRef.current[1] = element as HTMLDivElement}} className="w-[6rem] h-1 mt-1 bg-primary"></div>
                            <section className="w-[80%] mb-[5rem] py-[2rem]">
                                {
                                    data.map( (userEntry) => {
                                        return <DealsDropdown deals={userEntry.deals} name={userEntry.user} />
                                    })
                                }
                            </section>
                </section>
        </div>
    )
}