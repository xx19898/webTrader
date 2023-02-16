import './UserClass';
import {put, call, SagaReturnType, CallEffect, PutEffect, SelectEffect, select} from 'redux-saga/effects'
import {getLatestStockDeals, IUser,logIn, register} from './usersActions';
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
:Generator< any,void, any>
{
    const accessToken= yield select(getAccessToken)
    const response = yield call(getLatestStockDeals,accessToken)
    
    yield put({type:'UPDATE_STOCK_DEALS',payload:response})
}

export function* registerHandlerSaga(params:IUserHandlerSaga)
:Generator<any,
           void,
           any>
           {
            const response = yield call(register,params.payload)
           }


