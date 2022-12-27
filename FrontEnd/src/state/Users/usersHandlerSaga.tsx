import './UserClass';
import {put, call, SagaReturnType, CallEffect} from 'redux-saga/effects'
import {IUser,logIn, register} from './usersActions';
import { LOGIN } from './usersActionTypes';

//Deriving the return type for call(logIn) function
type LoginServiceResponse = SagaReturnType<typeof logIn>

type RegisterServiceResponse = SagaReturnType<typeof register>

interface IUserHandlerSaga{
    type: string,
    payload: IUser
}

export function* loginHandlerSaga(params:IUserHandlerSaga)
:Generator<CallEffect<LoginServiceResponse>,
                      LoginServiceResponse,
                      LoginServiceResponse>
{
    const response: LoginServiceResponse  = yield call(logIn,params.payload);
    return response;
}

export function* registerHandlerSaga(params:IUserHandlerSaga)
:Generator<RegisterServiceResponse,
           RegisterServiceResponse,
           RegisterServiceResponse>
           {
            const response: RegisterServiceResponse = yield call(register,params.payload)
           }
