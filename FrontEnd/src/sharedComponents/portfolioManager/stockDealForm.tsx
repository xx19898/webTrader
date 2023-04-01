import { useAppDispatch, useAppSelector } from '../../reduxHooks'
import { DropDownTextMenu } from '../dropdownMenuWithSearchbar/dropdownMenu';
import { OperationType, StockInPortfolio } from "./portfolioDataSchemas";
import {useEffect, useReducer, useState} from "react";
import { GET_SYMBOLS } from '../../state/Stocks/stocksActionTypes';
import SubmitButton from '../buttons/submitButton';
import axios from 'axios';
import { BASE_URL } from '../../constants/urls';
import { UPDATE_STOCK_DEALS } from '../../state/Users/usersActionTypes';

interface IStockDealForm{
    stocks: StockInPortfolio[],
}



const initialStockDealFormState = {
    SYMBOL:"",
    PRICE:undefined,
    OPERATION_TYPE: "NONE" as const,
    QUANTITY:undefined,
}

interface IStockDealFormState{
    SYMBOL: string,
    PRICE: number | undefined,
    OPERATION_TYPE: OperationType,
    QUANTITY: number | undefined,
}

const formReducer = (state: IStockDealFormState,action:{type: 'SYMBOL' | 'PRICE' | 'OPERATION_TYPE' | 'QUANTITY',payload:string | undefined}):IStockDealFormState => {
    return {
        ...state,
        [action.type]:action.payload
    }
}

export default ({stocks}:IStockDealForm) => {
    const symbols = useAppSelector((state) => state.stocks.symbols)
    const jwtToken = useAppSelector((state) => state.users.accessToken)
    const userId = useAppSelector((state) => state.users.userId)
    const [formState, formDispatch] = useReducer(formReducer,initialStockDealFormState)
    const [symbolIsCorrect,setSymbolIsCorrect] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(symbols.length == 0){
            dispatch({type:GET_SYMBOLS})
        }
    },[])

    return(
        <>
        <h2 className="text-lg font-semibold text-center mb-10 text-white">Make a new deal request</h2>
        <form className="flex justify-center items-center flex-col bg-darker-secondary-2 pb-5 pt-8 drop-shadow-md rounded-[17px]"
              onSubmit={(e) => {
                e.preventDefault()
                submitStockDeal(formState)
              }}>
            <div className="grid grid-cols-2 gap-4 w-full px-3">
            <label className="flex justify-center items-center text-center  text-white">Symbol</label>
            <DropDownTextMenu 
            nameOfItem={'symbol'}
            chosenValue={formState.SYMBOL}
            dataToVisualise={symbols}
            isCorrect={symbolIsCorrect}
            setChosenValue={(newValue:string) =>  formDispatch({type:'SYMBOL',payload:newValue})}
            setIsCorrect={setSymbolIsCorrect} />
            <label className="flex justify-center items-center text-center text-white">Quantity</label>
            <input
            className={(formState.QUANTITY === undefined || formState.QUANTITY?.toString().trim().length === 0) ? "pl-4 h-[44px] border-solid border-2 border-red-500 focus:outline-none rounded-[17px]" : "h-[44px] pl-4 focus:outline-none rounded-[17px]"} 
            type="text"
            onChange={(e) => {
                formDispatchInterceptor({type:"QUANTITY",payload:e.target.value})}
                }
            onInput={(e) => {
                console.log(e.currentTarget.value)
            }}/>
            <label className="flex justify-center items-center text-center text-white">Price</label>
            <input type="text"
            onChange={(e) => formDispatchInterceptor({type:"PRICE",payload:e.target.value})}
            className={(formState.PRICE === undefined || formState.PRICE.toString().trim().length === 0) ? "focus:outline-none pl-4 h-[44px] border-solid border-2 border-red-500 drop-shadow-md rounded-[17px]" : "h-[44px] pl-4 focus:outline-none drop-shadow-md rounded-[17px]"}
            />
            <button className={formState.OPERATION_TYPE === 'BUY' ? "text-white bg-primary py-2 shadow-[0px_0px_10px_3px_rgba(74,2,99,0.7)] drop-shadow-md rounded-[17px]" : "text-white font-sans bg-secondary py-2 shadow-[0px_0px_10px_3px_rgba(74,2,99,0.7)] drop-shadow-md rounded-[17px]"} onClick={(e) => {
                e.preventDefault()
                formDispatch({type:'OPERATION_TYPE',payload:'BUY'})
            }}>BUY</button>
            <button className={formState.OPERATION_TYPE === 'SELL' ? "text-white bg-primary py-2 shadow-[0px_0px_10px_3px_rgba(74,2,99,0.7)] drop-shadow-md rounded-[17px]" : "text-white bg-secondary py-2 shadow-[0px_0px_10px_3px_rgba(74,2,99,0.7)] drop-shadow-md rounded-[17px]"} onClick={(e) => {
                e.preventDefault()
                formDispatch({type:'OPERATION_TYPE',payload:'SELL'})
            }}>SELL</button>
            </div>
            <SubmitButton active={formInfoIsCorrect()} marginTop={1} text={"Submit"}  /> 
        </form>
        </>
    )
    function removeCharAtIndex(string:string,position:number){
        if(position === 0){
            return string.substring(1)
        }
        if(position === string.length - 1){
            return string.substring(0,position)
        }
        return string.slice(0,position) + string.slice(position + 1,string.length) 
    }

    function keepTargetAsNumber(value:string){
        let valueCopy = value
        for(let i = 0;i < value.length;i++){
            let charAsNumber = Number(value)
            if(isNaN(charAsNumber)){
                removeCharAtIndex(value,i)
                if(i !=0 && i != (value.length - 1)){
                    i = i - 1
                }
            }
        }
    }

    async function submitStockDeal(stockDealForm:IStockDealFormState){
        const requestConfig = {
            headers:{
                Authorization: jwtToken as string
            },
            withCredentials:true,
        }
        
        const response = await axios.post(BASE_URL + 'portfolio/createStockDeal',{
            symbol:stockDealForm.SYMBOL,
            stockPriceAtTheAcquirement: stockDealForm.PRICE,
            quantity: stockDealForm.QUANTITY,
            operationType: stockDealForm.OPERATION_TYPE,
            dealStatus: "PENDING",
            userId: userId as number,

        },requestConfig)

        dispatch({type:UPDATE_STOCK_DEALS})
    }

    function formInfoIsCorrect(){
        return Object.values(formState).every(e => e !== undefined)
    }

    function formDispatchInterceptor({type,payload}:{type: keyof IStockDealFormState, payload: string}){
        if(type === 'PRICE'){
            console.log({payload})
            const payloadAsNumber = Number(payload)
            console.log(Number.isNaN(payloadAsNumber))
            if(Number.isNaN(payloadAsNumber)){
                formDispatch({type:type,payload:undefined})
            }else{
                formDispatch({type:type,payload:payload})
            }
        }
        else if(type === 'QUANTITY'){
            console.log({payload})
            const payloadAsNumber = Number(payload)
            console.log(Number.isNaN(payloadAsNumber))
            if(!Number.isInteger(payloadAsNumber)){
                formDispatch({type:type,payload:undefined})
            }else{
                formDispatch({type:type,payload:payload})
            }
        }else{
            formDispatch({type:type,payload:payload})
        }
    }
}