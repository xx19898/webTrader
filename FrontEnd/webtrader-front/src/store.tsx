import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { userSlice } from './state/Users/usersSlice';
import {rootWatcherSaga} from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
    },
    middleware: [...getDefaultMiddleware({thunk:false}),sagaMiddleware]

})
sagaMiddleware.run(rootWatcherSaga)

//Return type of the root state
export type RootState = ReturnType<typeof store.getState>

//Type of AppDispatch
export type AppDispatch = typeof store.dispatch