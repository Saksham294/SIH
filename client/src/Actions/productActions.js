import axios from 'axios'

export const getAllProducts = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllProductsRequest"
      })
      const { data } = await axios.get("/api/getAllProducts")
      dispatch({
        type: "getAllProductsSuccess",
        payload: data.products
      })
    } catch (error) {
      dispatch({
        type: "getAllProductsFailure",
        payload: error.response.data.message
      })
    }
  }

export const getProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"getProductRequest"
        })
    
        const {data}=await axios.get(`/api/product/${id}`)
        
        dispatch({
            type:"getProductSuccess",
            payload:data.product,
        })
        
    } catch (error) {
        dispatch({
            type: "getProductFailure",
            payload: error.response.data.message
          })
    }
}
export const getRecommendedProduct=(productid)=>async(dispatch)=>{
  try {
      dispatch({
          type:"getRecommendedProductRequest"
      })
  
      const promises =productid.map(async (id) => {
        const { data } = await axios.get(`/api/product/${id}`);
        return data.product;
      });
      const recommendedProducts = await Promise.all(promises);
      
      dispatch({
          type:"getRecommendedProductSuccess",
          payload:recommendedProducts,
      })
      
  } catch (error) {
      dispatch({
          type: "getRecommendedProductFailure",
          payload: error.response.data.message
        })
  }

}
 
export const purchaseProduct=(id)=>async(dispatch)=>{
  try {
  
    dispatch({
        type:"purchaseProductRequest"
    })

    const {data}=await axios.get(`/api/product/buy/${id}`)
    
    dispatch({
        type:"purchaseProductSuccess",
        payload:data.product,
    })
    
} catch (error) {

    dispatch({
        type:"purchaseProductFailure",
        payload: error.response.data.message,
    })
}
}

export const addItemToCart=(id,productId)=>async(dispatch)=>{
  try {

    dispatch({
        type:"addToCartRequest"
    })

    const {data}=await axios.post(`/api/cart/${id}`,{productId})
    
    dispatch({
        type:"addToCartSuccess",
        payload:data.product,
    })
    
} catch (error) {
    console.log(error)
    dispatch({
        type:"addToCartFailure",
        payload: error.response.data.message,
    })
}
}

// Update the action to accept productId
export const removeItemFromCart = (id, productId) => async (dispatch) => {
  try {
    dispatch({
      type: "removeFromCartRequest",
    });

    const { data } = await axios.delete(`/api/cart/${id}/${productId}`);

    dispatch({
      type: "removeFromCartSuccess",
      payload: data.cart,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "removeFromCartFailure",
      payload: error.response.data.message,
    });
  }
};

export const getCartItems=(id)=>async(dispatch)=>{
  try {
  
    dispatch({
        type:"getCartItemsRequest"
    })

    const {data}=await axios.get(`/api/cart/${id}`)
    
    dispatch({
        type:"getCartItemsSuccess",
        payload:data.cart,
    })
    
} catch (error) {

    dispatch({
        type:"getCartItemsFailure",
        payload: error.response.data.message,
    })
}

}

export const getTopRated=()=>async(dispatch)=>{
  try {
  
    dispatch({
        type:"getTopRatedProductRequest"
    })

    const {data}=await axios.get(`/api/topRated`)
    dispatch({
        type:"getTopRatedProductSuccess",
        payload:data.products,
    })
    
} catch (error) {

    dispatch({
        type:"getTopRatedProductFailure",
        payload: error.response.data.message,
    })}
}