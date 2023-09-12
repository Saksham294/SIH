import { Button, Typography } from '@mui/material'
import axios from 'axios'
import { getRecommendedProduct, getTopRated } from '../../Actions/productActions'
import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './Home.css'
import ProductCard from '../ProductCard/ProductCard'
import { Link } from 'react-router-dom'
import images from './images.json'


const Home = () => {
    const { product } = useSelector((state) => state.recommended);
    const dispatch = useDispatch()
    let prods = [];
    let { loading, products } = useSelector(state => state.products)
    const { user } = useSelector(state => state.user);
    const { products: allproduct } = useSelector((state) => state.products);
    const {topRated} = useSelector((state) => state.topRated);
    let topRatedProducts = [];
    if (topRated) {
        topRated.forEach((el) => {
            topRatedProducts.push(el);
        })
    }
    let sub_cat = [];
    let brand = [];
    let item_id = [];
    let visited_count = [];
    let user_id = [];
    let response = null;
    const trainModel = async () => {
        if (allproduct) {
            allproduct.forEach((el) => {
                if (el.visitedBy.length >= 1) {
                    el.visitedBy.forEach(element => {
                        user_id.push(element);
                        sub_cat.push(el.subCategory);
                        brand.push(el.brand);
                        item_id.push(el._id);
                        visited_count.push(el.viewCount);
                    });
                }
            })

            visited_count = visited_count.map(number => number.toString());

            try {
                response = await axios.post("http://127.0.0.1:8000/train", {
                    "sub_cat": sub_cat,
                    "brand": brand,
                    "item_id": item_id,
                    "visited_count": visited_count,
                    "user_id": user_id,
                });
                console.log(response.data);


            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
    let result = null;
    let user_visisted_items = []
    const predict = async () => {
        if (user) {
            user.visited_items.forEach((el) => {
                user_visisted_items.push(el);
            })
        }
        const idsInDoubleQuotes = user_visisted_items.map(id => `"${id}"`);
        const visited = `[${idsInDoubleQuotes.join(',')}]`;

        try {
            result = await axios.post("http://127.0.0.1:8000/predict1", {
                "user_id": user._id
            });
            console.log(result.data);
            if (result.data && result.data.recommended_items) {
                await dispatch(getRecommendedProduct(result.data.recommended_items));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        // trainModel()
        // predict()
      dispatch(getTopRated())
    },[dispatch])
    return (
        <div className='insideHome'>
            <section className='homeSection'>

                <div className="homeDiv1">
                    <div className="homeText">
                        <Typography variant='h3'>UrbanBazaar</Typography>
                        <Typography variant='h5'>You deserve the best products</Typography>

                    </div>
                    <div className="homeDiv2">

                    </div>

                </div>

                <img src={images.imgUrl} className='homeImg'></img>
            </section>
            
            <section className='homeSection2'>
                <div className="overlay">
                    <Typography variant='h3'>Electronics at Best Prices</Typography>
                    <Link to='/allProducts'>
                        <Button variant='contained' color='primary'
                            sx={{ backgroundColor: "#08d4a4", margin: "2.2vw", fontSize: "1vw", paddingRight: "2vw", paddingLeft: "2vw", paddingTop: "1vw", paddingBottom: "1vw", borderRadius: "1.5vw", position: "absolute", top: "275px", left: "42vw" }}>
                            Shop Now
                        </Button>
                    </Link>
                </div>

            </section>
            <section className='pastInteractions'>
                <Typography variant='h3'>You may like</Typography>
            {product && product.map((el) => (
                <ProductCard
                    heading={el.name}
                    key={el._id}
                    img={el.image.url}
                    subheading={el.description}
                    price={el.price}
                    url={el._id}
                    />
                    ))}
            </section>
            <section className='fashion'>
                <img className='fashionGuyImg' src={images.imgUrl4} />
                <img className='fashionImg' src={images.imgUrl3} />
                <div className="fashionHeadingandDesc">
                    <Typography variant='h2' className='fashionHeading'> Fashion just a touch away</Typography>
                    <Typography variant='h5'>Experience fashion at its most convenient. With a simple touch, explore a world of trendy possibilities on UrbanBazaar, bringing your style desires to life</Typography>
                    <Link to='/allProducts'>
                        <Button variant='contained' color='primary'
                            sx={{ backgroundColor: "#08d4a4", margin: "2.2vw",marginLeft:"3vw" ,fontSize: "1vw", paddingRight: "2vw", paddingLeft: "2vw", paddingTop: "1vw", paddingBottom: "1vw", borderRadius: "1.5vw"}}>
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </section>
                <section className='topProducts'> 
                <Typography variant='h3'>Top Rated Products</Typography>
                {topRatedProducts && topRatedProducts.map((el) => (
                <ProductCard
                    heading={el.name}
                    key={el._id}
                    img={el.image.url}
                    subheading={el.description}
                    price={el.price}
                    url={el._id}
                    />)
                )}

                </section>
            <section className='homeDecor'>
                <Typography variant='h3'>Furniture at Lowest Prices</Typography>
                <div className='homeandFurniture'>
                    <img src={images.imgUrl6} />
                    <img src={images.imgUrl7} />
                    <img src={images.imgUrl8} />
                    <img src={images.imgUrl9} />
                    <img src={images.imgUrl10} />

                </div>
            </section>
        </div>
    )
}

export default Home
