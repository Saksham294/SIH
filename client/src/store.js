import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, userReducer } from './Reducers/userReducer';
import { getAllProductsReducer, topRatedReducer } from './Reducers/productReducer';
import { recommendationReducer } from './Reducers/productReducer';

const initialState = {}

const store = configureStore({
   reducer:{
    user: userReducer,
    products:getAllProductsReducer,
    cart:cartReducer,
    topRated:topRatedReducer,
    recommended:recommendationReducer

   },
    preloadedState: initialState
});

export default store;