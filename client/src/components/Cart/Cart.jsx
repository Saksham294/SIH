import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getCartItems, getProduct } from '../../Actions/productActions'
import './Cart.css'
import axios from 'axios'
import { Button } from '@mui/material'
import ProductCard from '../ProductCard/ProductCard'
import { getRecommendedProduct } from "../../Actions/productActions"

const Cart = (inCart) => {
    let response = [];
    const dispatch = useDispatch()
    const { product } = useSelector((state) => state.recommended);
    const { products } = useSelector(state => state.products)
    const { user } = useSelector(state => state.user);
    const userId = user._id
    useEffect(() => {
        dispatch(getCartItems(userId));
    }, [dispatch])
   
    const submitHandler = async () => {
        try {
            response = await axios.post("http://127.0.0.1:8000/postdetail", {
                "sub_cat": subcat,
                "brand": brand,
                "user_id": userid,
                "item_id": item_id
            });
            console.log(response.data);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    let subcat = [];
    let brand = [];
    let userid = [];
    let item_id = [];
    if (products) {
        products.forEach((el) => {
            for (let i = 0; i < el.boughtBy.length; i++) {
                subcat.push(el.subCategory);
                // console.log(el);
                brand.push(el.brand);
                userid.push(el.boughtBy[i]);
                item_id.push(el._id);
            }
        })
    }

    const { cart } = useSelector(state => state.cart)
    let cartItems = [];
    if (cart) {
        cartItems = cart.items
    }
 
    const predict = async () => {
        try {
            const result = await axios.post("http://127.0.0.1:8000/predict", {
                user_id: user._id,
            });
            console.log(result.data);
            if (result.data && result.data.recommendation) {
                dispatch(getRecommendedProduct(result.data.recommendation));
            }
        } catch (error) {
            console.error("Error predicting recommendations:", error);
        }
    }
    useEffect(() => {
        submitHandler();
        predict();
    }, [dispatch])


    return (
        <div className='cartContainer'>
            <Typography variant='h2'>Your Cart</Typography>
            {cartItems.length > 0 ? cartItems.map((item, index) => (
                <div className='cartItems'>
                    <ProductCard
                        heading={item.name}
                        img={item.image.url}
                        url={item.productId}
                        inCart={true}
                    />
                </div>
            )) : <Typography variant='h2' sx={{textAlign:"center"}}>Your card is empty</Typography>}

            <div className='recommendations'>
                <Typography variant='h4' sx={{margin:"1vw"}}>Other Users Also Bought</Typography>

                {product && product.map((el) => (

                    <ProductCard
                        heading={el.name}
                        key={el._id}
                        img={el.image.url}
                        subheading={el.description}
                        price={el.price}
                        url={el._id} />



                ))}
            </div>
        </div>

    )
}

export default Cart
