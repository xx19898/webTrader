import {concatListOfSymbols} from "../../state/Stocks/stocksUtility";

const array = ["IBM","APPLE","GP"];


test('concatanating list of strings works properly',() => {
    expect(concatListOfSymbols(array)).toBe("IBM,APPLE,GP");
});