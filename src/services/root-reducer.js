import { combineReducers } from "redux";
import productsReducer from "./products/products.reducer";
import categoryReducer from "./category/category.reducer";
import merchantsReducer from "./merchants/merchants.reducer";
import AuthReducer from "./auth/auth.reducer";
export default combineReducers({
	products: productsReducer,
	categories: categoryReducer,
	merchants: merchantsReducer,
	auth: AuthReducer,
});
