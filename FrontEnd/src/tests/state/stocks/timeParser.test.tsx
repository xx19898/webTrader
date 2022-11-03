import timeParser from '../../../state/Stocks/stocksUtility/timeParser';

describe('parsing datetime',() => {
    it('should correctly parse time from yyyy-mm-dd hh-mm-ss format to unix format', () => {
        console.log(timeParser("2022-11-01 19:50:00"))
        expect(timeParser("2022-11-01 19:50:00")).toBe(1667325000)
    })
})