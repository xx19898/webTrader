import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import React from "react";
import {useState} from 'react'

import ApiRequestLimitExceededComponent from "../sharedComponents/stocksViewer/apiRequestLimitExceededComponent"
import { Provider } from "react-redux";


const Template:ComponentStory<typeof ApiRequestLimitExceededComponent> = () => <ApiRequestLimitExceededComponent />


export const Default = Template.bind({})
const newDate_1 = new Date()
const newDate_2 = new Date()
newDate_1.setSeconds(newDate_1.getSeconds() + 5)
newDate_2.setSeconds(newDate_2.getSeconds() + 10)

const waitArrayState = {
    timeToWaitForApiRequestSlots:[newDate_1,newDate_2]
}
export const Mockstore = ({mockState,children}:{mockState: typeof waitArrayState,children: any}) => (
    <Provider
    store={configureStore({
        reducer: {
            stocks:createSlice({
                name:'stocks',
                initialState: waitArrayState,
                reducers:{
                    EARLIEST_STOCK_API_REQUEST_COOLDOWN_TIME_EXPIRED:(state,action: PayloadAction<void>) => {
                        console.log("reacted")
                        const sortedArray = state.timeToWaitForApiRequestSlots.sort((firstDate,secondDate) => {
                            if(firstDate.getTime() <= secondDate.getTime()){
                                return 0
                            }
                            return 1
                        })
                        sortedArray.shift()
                        state.timeToWaitForApiRequestSlots = sortedArray
                    }
                }
            }).reducer
        }
    })}
    >
        {children}
    </Provider>
)



export default {
    title: "ApiRequestLimitExceededComponent",
    component: ApiRequestLimitExceededComponent,
    decorators: [(story) => <Mockstore mockState={waitArrayState}>{story()}</Mockstore>]
} as ComponentMeta<typeof ApiRequestLimitExceededComponent>

