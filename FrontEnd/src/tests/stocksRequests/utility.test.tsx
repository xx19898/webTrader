import {concatListOfSymbols,sum} from "../../state/Stocks/stocksUtility";

const array = ["IBM","APPLE","GP"];

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
test('concatanating list of strings works properly',() => {
    expect(concatListOfSymbols(array)).toBe("IBM,APPLE,GP");
});