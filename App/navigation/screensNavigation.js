import React from 'react';
import { createStackNavigator, createAppContainer } from "@react-navigation/stack";
import { customerBottomTabs } from './bottomTabs';

import QRCodeScanner from '../screens/QRCodeScanner';

// Customer Screens
import ShopItems from '../screens/customer/shopItems/shopItems';
import RewardItems from '../screens/customer/rewardItems/rewardItems';
import ShopItemsCart from '../screens/customer/shopItems/shopItemsCart';
import RewardItemsCart from '../screens/customer/rewardItems/rewardItemsCart';
import ShopItemsQR from '../screens/customer/shopItems/shopItemsQR';
import RewardItemsQR from '../screens/customer/rewardItems/rewardItemsQR';
import CustomerEditProfile from '../screens/customer/profile/customerEditProfile';

const Stack = createStackNavigator();

export default Screens = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="customerShops" component={ClientHomepage} />  
      <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />  
      <Stack.Screen name="shopItems" component={ShopItems} />
      <Stack.Screen name="shopItemsCart" component={ShopItemsCart} />  
      <Stack.Screen name="shopItemsQR" component={ShopItemsQR} />   
      <Stack.Screen name="rewardItems" component={RewardItems} />
      <Stack.Screen name="rewardItemsCart" component={RewardItemsCart} />
      <Stack.Screen name="rewardItemsQR" component={RewardItemsQR} />
      <Stack.Screen name="customerEditProfile" component={CustomerEditProfile} />
    </Stack.Navigator>
    
  );
}