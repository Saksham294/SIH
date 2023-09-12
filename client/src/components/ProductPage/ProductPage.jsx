import React,{useEffect} from 'react'
import './ProductPage.css'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { getProduct,purchaseProduct } from '../../Actions/productActions'
import Star from '../Star/Star'

const ProductPage = ({ productId, price, description, rating,image }) => {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()
    const { product, loading } = useSelector(state => state.products)
    console.log(product)
    useEffect(() => {
        dispatch(getProduct(id))
    }, [])
    
    const buyHandler = () => {
        dispatch(purchaseProduct(id))
    }

    return loading === undefined || loading === true || product === undefined ? null : (
     <>
        <div className='productPageBox'>
            <div className="productImages">
                <img src={product.image.url} alt="" />
            </div>
            <div className="productInfo">
                <Typography variant='h4'>{product.name}</Typography>
                <Star stars={4}></Star>
                <Typography variant='h6'>₹ {product.price}</Typography>
                <Button onClick={buyHandler} variant='contained' color='primary' sx={{
                    backgroundColor: "#08d4a4",
                    fontSize: "1vw",
                    paddingRight: "8vw",
                    paddingLeft: "8vw",
                    paddingTop: "1vw",
                    paddingBottom: "1vw",
                    borderRadius: "1.5vw",
                    marginTop: "2vw",
                    marginLeft: "14.5vw"

                }}>Buy Now</Button>
            </div>
        </div>
        <div className="description">
            <Typography variant='h5'>Description</Typography>
            <Typography variant='h6'>
                {product.description}
            </Typography>
        </div>
     </>
    )
}

export default ProductPage
