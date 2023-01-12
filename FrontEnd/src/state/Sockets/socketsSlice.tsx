import { createSlice } from "@reduxjs/toolkit";
import { finnhubToken } from "../../constants/stocksRelatedConstants";
import {io} from "socket.io-client"

/*
const finnhubSocket = io('wss://ws.finnhub.io',
{
    transports: ['websocket'],
    path: '/',
    query: {
        token: `${finnhubToken}`,
  },
},
  )


const initialState = {
    finnhubSocket: finnhubSocket,
}

export const socketsSlice = createSlice({
    name: 'sockets',
    initialState: initialState,
    reducers: {
        CONNECT: (state) => {
            if(state.finnhubSocket.disconnected){
                finnhubSocket.connect()
            }
        },
        DISCONNECT: (state) => {
            if(state.finnhubSocket.connected) state.finnhubSocket.disconnect()
        },
    }
})

export const {CONNECT,DISCONNECT} = socketsSlice.actions
*/