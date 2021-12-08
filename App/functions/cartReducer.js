//for handling cart items
import {React} from 'react';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../functions/cartFunction';
import CartItem from '../models/cartItem';
//import cartItems

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const product_ID = addedProduct.product_ID;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.product_Name;
            const imgLink = Array.isArray(addedProduct.imgLink)?addedProduct.imgLink[0]: addedProduct.imgLink;
            const store_ID = addedProduct.shop_ID;
            const type = addedProduct.type;
            let cartItem;
            
            //check if cart has the item to be added
            if(state.items[product_ID]){
                cartItem = new CartItem(
                    state.items[product_ID].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[product_ID].total + prodPrice,
                    imgLink,
                    store_ID,
                    type
                );
            }
            else{
                cartItem = new CartItem(1, prodPrice, prodTitle, prodPrice, imgLink, store_ID, type)
            }
            return {
                ...state,
                items: { ...state.items, [product_ID]: cartItem },
                totalAmount: state.totalAmount + prodPrice
            };

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.product_ID]
            const currentQty = selectedCartItem.quantity;
            let cartItems;
            if(currentQty > 1){
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1, 
                    selectedCartItem.productPrice, 
                    selectedCartItem.productTitle, 
                    selectedCartItem.total - selectedCartItem.productPrice,
                    selectedCartItem.imgLink,
                    selectedCartItem.store_ID,
                    selectedCartItem.type
                );
                cartItems = { ...state.items, [action.product_ID]: updatedCartItem}
            }
            else{
                cartItems = { ...state.items };
                delete cartItems[action.product_ID];
            }
            return {
                ...state,
                items: cartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };

        case CLEAR_CART:
            let minus = 0;
            let cItems = { ...state.items };
            for(var i in cItems){
                if(cItems[i]["store_ID"] === action.store_ID){
                    minus = minus + cItems[i]["productPrice"];
                    console.log("id " + action.store_ID)
                    console.log("min " + minus + " price " + cItems[i]["productPrice"]);
                    console.log
                    delete cItems[i];
                }
            }
            return {
                ...state,
                items: cItems,
                totalAmount: state.totalAmount - minus
            };

    }
    return state;
};