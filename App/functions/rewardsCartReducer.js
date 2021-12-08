//for handling cart items
import {React} from 'react';
import { REDEEM_TO_CART, CANCEL_REDEEM, CLEAR_CART } from '../functions/rewardsCartFunction';
import CartItem from '../models/cartItem';
//import cartItems

const initialState = {
    rewItems: {},
    totalPoints: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REDEEM_TO_CART:
            const claimReward = action.reward;
            const pointsReq = claimReward.pointsReq;
            const rewName = claimReward.reward_Name;
            const imgLink = Array.isArray(claimReward.imgLink)?claimReward.imgLink[0]: claimReward.imgLink;
            const store_ID = claimReward.shop_ID;
            const type = claimReward.type;
            let cartItem;
            
            //check if cart has the item to be added
            if(state.rewItems[claimReward.reward_ID]){
                cartItem = new CartItem(
                    state.rewItems[claimReward.reward_ID].quantity + 1,
                    pointsReq,
                    rewName,
                    state.rewItems[claimReward.reward_ID].total + pointsReq,
                    imgLink,
                    store_ID,
                    type
                );
            }
            else{
                cartItem = new CartItem(1, pointsReq, rewName, pointsReq, imgLink, store_ID, type)
            }
            return {
                ...state,
                rewItems: { ...state.rewItems, [claimReward.reward_ID]: cartItem },
                totalPoints: state.totalPoints + pointsReq
            };

        case CANCEL_REDEEM:
            const selectedCartItem = state.rewItems[action.reward_ID]
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
                cartItems = { ...state.rewItems, [action.reward_ID]: updatedCartItem}
            }
            else{
                cartItems = { ...state.rewItems };
                delete cartItems[action.reward_ID];
            }
            return {
                ...state,
                rewItems: cartItems,
                totalPoints: state.totalPoints - selectedCartItem.productPrice
            };
        
        case CLEAR_CART:
            let minus = 0;
            let cItems = { ...state.rewItems };
            for(var i in cItems){
                if(cItems[i]["store_ID"] === action.store_ID){
                    minus = minus + cItems[i]["pointsReq"];
                    console.log("id " + action.store_ID)
                    console.log("min " + minus + " price " + cItems[i]["pointsReq"]);
                    console.log
                    delete cItems[i];
                }
            }
            return {
                ...state,
                rewItems: cItems,
                totalPoints: state.totalPoints - minus
            };

    }
    return state;
};