import './UserClass';
import {put, call, SagaReturnType, CallEffect} from 'redux-saga/effects'
import {IUser,logIn} from './usersActions';
import { LOGIN } from './usersActionTypes';

//Deriving the return type for call(logIn) function
type LoginServiceResponse = SagaReturnType<typeof logIn>

interface ILoginHandlerSaga{
    type: string,
    payload: IUser
}

export function* loginHandlerSaga(params:ILoginHandlerSaga)
:Generator<CallEffect<LoginServiceResponse>,
                      LoginServiceResponse,
                      LoginServiceResponse>
{
    const response: LoginServiceResponse  = yield call(logIn,params.payload);
    return response;
}