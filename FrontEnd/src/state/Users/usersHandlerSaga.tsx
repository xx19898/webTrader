import './UserClass';
import {put, call, SagaReturnType, CallEffect, PutEffect, SelectEffect, select} from 'redux-saga/effects'
import {getLatestStockDeals, IUser,logIn, register} from './usersActions';
import { LOGIN } from './usersActionTypes';
import { AnyAction, Dispatch } from 'redux';
import { StockDeals, stockDealSchema, stockDealsSchema } from '../../sharedComponents/portfolioManager/stockDealVisualizer';
import { RootState } from '../../store';

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
    const response  = yield call(logIn,params.payload);
    return response;
}

const getAccessToken = (state:RootState) => state.users.accessToken

export function* updateStockDealsHandlerSaga()
:Generator< SelectEffect,void,StockDeals> | CallEffect<StockDeals> | PutEffect<AnyAction> 
{
    const accessToken = yield select(getAccessToken)
    const response = yield call(getLatestStockDeals,accessToken)
    yield put({type:'UPDATE_STOCK_DEALS',payload:response})
}

export function* registerHandlerSaga(params:IUserHandlerSaga)
:Generator<RegisterServiceResponse,
           void,
           RegisterServiceResponse>
           {
            const response = yield call(register,params.payload)
           }


