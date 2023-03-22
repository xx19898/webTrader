import { createSlice } from "@reduxjs/toolkit"
import { Conversation } from "./messagingZodSchemas"





export type Messaging = {
    conversations: Conversation[],
    lastUpdated: Date | undefined,
}

const initialState:Messaging = {
    conversations: [],
    lastUpdated: undefined
}

export const messagingSlice = createSlice({
    name: 'messaging',
    initialState: initialState,
    reducers: {
        SET_NEW_CONVERSATIONS(state, action:{type:string,payload: Conversation[]}){
            state.conversations = action.payload
            state.lastUpdated = new Date()
        },

    }
})


export const {SET_NEW_CONVERSATIONS} = messagingSlice.actions