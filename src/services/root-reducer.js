import { combineReducers } from "redux";
import productsReducer from "./products/products.reducer";
import categoryReducer from "./category/category.reducer";
import merchantsReducer from "./merchants/merchants.reducer";
export default combineReducers({
	products: productsReducer,
	categories: categoryReducer,
	merchants: merchantsReducer,
});
