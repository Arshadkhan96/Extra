// src/reducers/cartReducer.js
import {
    ADD_TO_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    RESET_CART,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstant';

const initialState = {
    cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) 
        : [],
    shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }
            
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            };
            
        case UPDATE_CART_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item => 
                    item.product === action.payload.id 
                        ? { ...item, quantity: action.payload.quantity } 
                        : item
                )
            };
            
        case RESET_CART:
            return {
                ...state,
                cartItems: []
            };
            
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            };
            
        default:
            return state;
    }
};