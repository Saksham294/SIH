import React, { useEffect } from 'react'
import './ProductCard.css'
import { Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../Actions/productActions';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ heading, subheading, img, url, price, inCart }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    let userId = "";
    if (user) {
        userId = user._id
    }

    const handleAddToCart = () => {
        dispatch(addItemToCart(userId, url))
        console.log("Added to cart");
    }

    const handleRemoveFromCart = () => {
        dispatch(removeItemFromCart(userId, url))
        console.log("Removed from cart");
    }

    return (
        <>
            <div className='productContainer'>
                <div className="productImg">
                    <img src={img}></img>
                </div>
                <a href={`/product/${url}`}>
                    <div className="productText">
                        <Typography variant='h5'>{heading}</Typography>
                        <div className="productParaText">
                            <p>{subheading}</p>
                        </div>
                        <Typography variant='h6'>₹ {price}</Typography>
                    </div>
                </a>

                {inCart ? null : <IconButton onClick={handleAddToCart} sx={{ fontSize: "small", marginLeft: "18vw", color: "#08d4a4" }}><AddShoppingCartIcon /></IconButton>}
                {inCart ? <IconButton onClick={handleRemoveFromCart} sx={{ fontSize: "small", marginLeft: "15vw", color: "red" }}><DeleteIcon /></IconButton> : null}
            </div>

        </>

    )
}

export default ProductCard
