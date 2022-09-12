package utility;

import java.util.List;

public interface StockDataObject<T>{
	T composeAnStockDataObjectFromMultipleDataObjects(List<T> dataObjects);
}
