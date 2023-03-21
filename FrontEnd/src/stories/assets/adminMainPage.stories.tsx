import React from 'react'
import { AdminMainPage } from '../../pages/mainPage/adminMain/adminMainPage'
import { IAdminMainPage } from '../../pages/mainPage/adminMain/adminMainPage'

export default{
    component: AdminMainPage,
    title:'AdminMainPage'
}

const Template = (args: IAdminMainPage) => <AdminMainPage {...args} />

export const Default = Template.bind({})

const args: IAdminMainPage = {
    searchedUsername: 'user2',
    setSearchedUsernameCallback: (update: string | ((prevState: string) => string)) => console.log({update}),
    usersData: [
        {
            id:2,
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
    ],
    conversations: []
}
/*
Default.args = {
    ...args
}

*/