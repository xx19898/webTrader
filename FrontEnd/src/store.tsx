import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { userSlice } from './state/Users/usersSlice';
import {rootWatcherSaga} from './rootSaga';
import { stockSlice } from './state/Stocks/stocksSlice';
import { messagingSlice } from './state/messaging/messagingSlice';
import { adminSlice } from './pages/mainPage/adminMain/state/adminSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        users: userSlice.reducer, 
        stocks : stockSlice.reducer,
        messaging: messagingSlice.reducer,
        admin: adminSlice.reducer,
    },
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootWatcherSaga)


//Return type of the root state
export type RootState = ReturnType<typeof store.getState>

//Type of AppDispatch
export type AppDispatch = typeof store.dispatch