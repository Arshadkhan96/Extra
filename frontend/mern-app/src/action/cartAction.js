// src/actions/cartActions.js
import {
    ADD_TO_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    RESET_CART,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstant';

export const addToCart = (item) => async (dispatch, getState) => {
    const { cartItems } = getState().cart;
    
    // Check if item already exists in cart
    const existingItem = cartItems.find(x => x.product === item.product);
    
    if (existingItem) {
        // Update quantity if item exists
        dispatch({
            type: UPDATE_CART_ITEM_QUANTITY,
            payload: {
                product: item.product,
                quantity: existingItem.quantity + item.quantity
            }
        });
    } else {
        // Add new item to cart
        dispatch({
            type: ADD_TO_CART,
            payload: item
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id
    });
    
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const updateCartItemQuantity = (id, quantity) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_CART_ITEM_QUANTITY,
        payload: { id, quantity }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const resetCart = () => async (dispatch) => {
    dispatch({ type: RESET_CART });
    localStorage.removeItem('cartItems');
};

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
};