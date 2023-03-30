import {RootState} from "../../store";
import axios from 'axios';
import { BASE_URL, LOGIN_URL } from "../../constants/urls";
import { stockDealSchema, stockDealsSchema } from "../../sharedComponents/portfolioManager/stockDealVisualizer";
import { loginResponseSchema } from "./userZodSchemas";

export interface IUser{
    password: string,
    username: string
}

export const constructAxiosBodyForLoginRequest = (user:IUser) => {
    const formData = new FormData()

    formData.append('username',user.username)
    formData.append('password',user.password)

    return ({
        method: 'post',
        url:LOGIN_URL,
        withCredentials:true,
        data:formData
    })
}

export const logIn = (user: IUser) => {
    const axiosRequestBody = constructAxiosBodyForLoginRequest(user)

    const axiosRequest = axios(axiosRequestBody).then(
        (response) => {
            const data = loginResponseSchema.parse(response)
            return data
        })
        .catch( err => {
            console.log(err)
        })

    return axiosRequest
    }

export const register = (user:IUser) => {
    return axios({
        method: 'post',
        url:`${BASE_URL}` + 'register',
        data:user
    }).then(
        (response) => {
            return response
        })
        .catch( err => {
            return err
        })
}

export const getLatestStockDeals = (accessToken:string) => {
    return axios({
        method: 'get',
        headers: {
            Authorization: accessToken
        },
        withCredentials:true,
        url: BASE_URL + 'portfolio/getStockDeals'
    }).then(result => {
        if(Object.keys(result.data).length != 0){
            console.log(Object.keys(result.data).length)
            console.log({result})
            const parsedServerResponse = stockDealsSchema.parse(result.data)
            return parsedServerResponse
        }
        else return []
    })
}




