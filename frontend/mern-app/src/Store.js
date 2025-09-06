import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';  // Use named import instead of default
import { composeWithDevTools } from "@redux-devtools/extension";

import { userReducer } from "./reducers/userReducer";
import { 
  productReducer,
  productDetailsReducer,
  newProductReducer,
  updateProductReducer,

} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { newReviewReducer } from "./reducers/reviewReducer";
// Combine all reducers
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  productUpdate: updateProductReducer,
  productReview: newReviewReducer,
  user: userReducer,  
  cart: cartReducer,  // Add cart reducer here
});

// Initial state
const initialState = {};

// Middleware setup
const middleware = [thunk];

// Create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


