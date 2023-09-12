import { createReducer} from "@reduxjs/toolkit";

const initialState={}

export const userReducer=createReducer(initialState,{

    loginRequest:(state)=>{
        state.loading=true;
    },
    loginSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true

    },
    loginFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload;
        state.isAuthenticated=false
    },

    registerRequest:(state)=>{
        state.loading=true;
    },
    registerSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true
    },
    registerFailure:(state,action)=>{
        state.loading=false
        state.isAuthenticated=false
        state.error=action.payload;
    },

    loadUserRequest:(state)=>{
        state.loading=true;
    },
    loadUserSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true
    },
    loadUserFailure:(state,action)=>{
        state.loading=false
        state.isAuthenticated=false
        state.error=action.payload;
    },

    logoutUserRequest: (state) => {
        state.loading = true;
      },
      logoutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      },
      logoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
      },
      updatePasswordRequest: (state) => {
        state.loading = true;
      },
      updatePasswordSuccess: (state) => {
        state.loading = false;
      },
      updatePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

})

export const cartReducer=createReducer(initialState,{
    addToCartRequest:(state)=>{
        state.loading=true;
    },
    addToCartSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    addToCartFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    removeFromCartRequest:(state)=>{
        state.loading=true;
    },
    removeFromCartSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    removeFromCartFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    getCartItemsRequest:(state)=>{
        state.loading=true;
    },
    getCartItemsSuccess:(state,action)=>{
        state.loading=false;
        state.cart=action.payload;
    },
    getCartItemsFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
  })