import {RootState} from "../../store";
import axios from 'axios';

export interface IUser{
    password: String,
    username: String
}


//TODO: type the data received from api with help of "zod"
export const logIn = (user: IUser) => {
    axios({
        method: 'get',
        url:'https://localhost:8000',
        data:user
    }).then(
        (response) => {
            return response
        })
        .catch( err => {
            console.log(err)
        })
        }

