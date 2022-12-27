import {RootState} from "../../store";
import axios from 'axios';
import { BASE_URL } from "../../constants/urls";

export interface IUser{
    password: string,
    username: string
}

export const logIn = (user: IUser) => {
    const formData = new FormData()

    formData.append('username',user.username)
    formData.append('password',user.password)

    return axios({
        method: 'post',
        url:`${BASE_URL}` + 'login',
        data:formData
    }).then(
        (response) => {
            return response
        })
        .catch( err => {
            console.log(err)
        })
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

