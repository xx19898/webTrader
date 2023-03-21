import { z } from "zod";
import { getUserInfoApiResponse } from "../../pages/mainPage/adminMain/adminMainPageSchema";

const apiResponse = [
  {
    id: 1,
    username: "user1",
    portfolio: null,
    stockDeals: [
      {
        quantity: 1,
        stockPriceAtTheAcquirement: 415.0,
        dealStatus: "CANCELLED",
        operationType: "BUY",
        createdDate: "2023-03-15T16:27:17.041471Z",
        id: 1,
        ownerName: "user1",
        userId: 1,
        symbol: 'AAPL'
      },
    ],
  },
  { id: 2, username: "admin", portfolio: null, stockDeals: [] },
];

describe('parsing userinfo from admin side works',() => {
    it('parsing userinfo from admin side works',() => {
        expect(new Promise(() => {
            const testData = "123.4"
            const result = getUserInfoApiResponse.parse(apiResponse)
        })).resolves.not.toThrowError()
    })
})