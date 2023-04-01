import UserInfoVisualizer from "../pages/mainPage/adminMain/userInfoVisualizer";
import userInfoVisualizer from "../pages/mainPage/adminMain/userInfoVisualizer";
import { Conversation } from "../state/messaging/messagingZodSchemas";


export default{
    component: userInfoVisualizer,
    title: 'UserInfoVisualizer'
}
/*
const Template = (args:UserInfoAdmin) => <UserInfoVisualizer {...args} /> 

export const Default = Template.bind({})

const args:UserInfoAdmin = {
    userId:2,
    attainPortfolioData:atta,
    portfolio: {
        balance: 222,
        id: 23,
        ownerId: 2,
        portfolioStocks:[{
            portfolioId:23,
            priceAtTheAcquirement:2334,
            quantity:2,
            symbol:'AAPL',
            userId:2,
        }]
    },
    stockDeals: [{
        createdDate: new Date(),
        dealStatus:'PENDING',
        id:234,
        operationType:'BUY',
        ownerName:'user2',
        quantity:3,
        stockPriceAtTheAcquirement:1984,
        symbol: 'GGL',
        userId:2
    }],
    username: 'user2'
}

const conversation:Conversation = {
    conversationId: 2,
    participants: [{participantId:1,participantName:'user2'},{participantName:'admin',participantId:2}],
    messages: [{
        date: new Date(1999,11,22),
        id: 1,
        message:'hi',
        replyTo: null,
        senderUsername: 'user2'
    }]
}

/*
Default.args = {
    ...args,conversation
}
*/