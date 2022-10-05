//TODO: test that fetching stock data from backend api and populating the state
//TODO: works correctly
import { stockSlice } from "../../../state/Stocks/stocksSlice"
import stocksWatcherSaga from "../../../state/Stocks/stocksWatcherSaga"
import { expectSaga } from 'redux-saga-test-plan';


it('should fetch stock data from api, process them and save in state',() => {
    
    return expectSaga(stocksWatcherSaga)
        .withReducer(stockSlice.reducer)
        .dispatch({ type:"" })
        .run()
    expect(2).toBe(2);
});

