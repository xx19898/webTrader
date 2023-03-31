import axios from "axios"
import { BASE_URL } from "../../../../constants/urls"
import { getUserInfoApiResponse } from "../adminMainPageSchema"


export async function attainUserPortfolioData(accessToken: string){
    const response = await axios({
        method: 'get',
        withCredentials:true,
        url: BASE_URL + "admin/allUserData",
        headers:{
            Authorization: accessToken,
        },
    })
    return getUserInfoApiResponse.parse(response.data)
}