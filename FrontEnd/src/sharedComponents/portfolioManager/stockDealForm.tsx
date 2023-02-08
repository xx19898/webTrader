import { useAppSelector } from '../../reduxHooks'
import { DropDownTextMenu } from '../dropdownMenuWithSearchbar/dropdownMenu';
import { OperationType, StockInPortfolio } from "./portfolioDataSchemas";
import {useEffect, useReducer, useState} from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useDispatch } from 'react-redux';
import { GET_SYMBOLS } from '../../state/Stocks/stocksActionTypes';
import { ISymbolList } from '../../state/Stocks/stocksRequestTypes';
import { IStockSymbolList } from '../../state/Stocks/stocksZodSchemas';
import SubmitButton from '../buttons/submitButton';
import axios from 'axios';
import { BASE_URL } from '../../constants/urls';
import { request } from 'http';

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
    const [formState, formDispatch] = useReducer(formReducer,initialStockDealFormState)
    const [symbolIsCorrect,setSymbolIsCorrect] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(symbols.length == 0){
            dispatch({type:GET_SYMBOLS})
        }
    },[])

    return(
        <>
        <h2 className="text-lg font-semibold text-center mb-10 text-white">Make a new deal request</h2>
        <div className="w-full h-[6rem] grid grid-cols-2">
            <label>Symbol</label><label>{formState.SYMBOL}</label>
            <label>Quantity</label><label>{formState.QUANTITY}</label>
            <label>Price</label><label>{formState.PRICE}</label>
            <label>OPERATION TYPE</label><label>{formState.OPERATION_TYPE}</label>
        </div>
        <form className="flex justify-center items-center flex-col bg-darker-secondary-2 pb-5 pt-8"
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
            className={(formState.QUANTITY === undefined || formState.QUANTITY?.toString().trim().length === 0) ? "pl-4 h-[44px] border-solid border-2 border-red-500 focus:outline-none" : "h-[44px] pl-4 focus:outline-none"} 
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
            className={(formState.PRICE === undefined || formState.PRICE.toString().trim().length === 0) ? "focus:outline-none pl-4 h-[44px] border-solid border-2 border-red-500 " : "h-[44px] pl-4 focus:outline-none"}
            />
            <button className="text-white bg-secondary py-2" onClick={(e) => {
                e.preventDefault()
                formDispatch({type:'OPERATION_TYPE',payload:'BUY'})
            }}>BUY</button>
            <button className="text-white bg-secondary py-2" onClick={(e) => {
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

    function submitStockDeal(stockDealForm:IStockDealFormState){
        const requestConfig = {
            headers:{
                Authorization: jwtToken as string
            },
            withCredentials:true,
        }

        console.log(BASE_URL + 'users/addAStockDeal')
        
        const request = axios.post(BASE_URL + 'users/addAStockDeal',{
            symbol:stockDealForm.SYMBOL,
            price: stockDealForm.PRICE,
            quantity: stockDealForm.QUANTITY,
            operation_type: stockDealForm.OPERATION_TYPE
        },requestConfig)
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