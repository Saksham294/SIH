import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const getAllProductsReducer = createReducer(initialState, {
    getAllProductsRequest: (state, action) => {
        state.loading = true;
    },
    getAllProductsSuccess: (state, action) => {
        state.loading = false;
        state.products = action.payload;
    },
    getAllProductsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getProductRequest: (state, action) => {
        state.loading = true;
    }
    ,
    getProductSuccess: (state, action) => {
        state.loading = false;
        state.product = action.payload;
    }
    ,
    getProductFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const productOperationsReducer = createReducer(initialState, {
      purchaseProductRequest:(state, action) => {
        state.loading = true;

      },
      purchaseProductSuccess:(state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      purchaseProductFailure:(state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
})
export const recommendationReducer=createReducer(initialState,{
    getRecommendedProductRequest: (state, action) => {
        state.loading = true;
    }
    ,
    getRecommendedProductSuccess: (state, action) => {
        state.loading=false;
        state.product=action.payload;
    }
    ,
    getRecommendedProductFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const topRatedReducer=createReducer(initialState,{
    getTopRatedProductRequest: (state, action) => {
        state.loading = true;
    }
    ,
    getTopRatedProductSuccess: (state, action) => {
        state.loading=false;
        state.topRated=action.payload;
    }
    ,
    getTopRatedProductFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }

})