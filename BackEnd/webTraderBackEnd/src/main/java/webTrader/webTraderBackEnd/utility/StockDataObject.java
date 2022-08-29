package webTrader.webTraderBackEnd.utility;

import java.util.List;

public interface StockDataObject<T>{
	void composeAnStockDataObjectFromMultipleDataObjects(List<T> dataObjects);
	T getComposedDataObject();
}
