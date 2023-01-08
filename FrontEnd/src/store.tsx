import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { userSlice } from './state/Users/usersSlice';
import {rootWatcherSaga} from './rootSaga';
import { stockSlice } from './state/Stocks/stocksSlice';
import { socketsSlice } from './state/Sockets/socketsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        users: userSlice.reducer, 
        stocks : stockSlice.reducer,
        sockets : socketsSlice.reducer
    },
    middleware: [sagaMiddleware]

})
sagaMiddleware.run(rootWatcherSaga)


//Return type of the root state
export type RootState = ReturnType<typeof store.getState>

//Type of AppDispatch
export type AppDispatch = typeof store.dispatch