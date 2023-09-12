import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai'
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Star.css'

const Star = ({ stars }) => {

  const { id } = useParams();
  const { product, loading } = useSelector(state => state.products);

  const MAX_RATING = 5;

  let productRating = product.rating;


  const filledStars = Array.from({ length: Math.floor(productRating) }, (_, index) => (
    <span key={index} className="star filled-star">&#9733;</span>
  ));


  const remainingStars = MAX_RATING - filledStars.length;


  const unfilledStars = Array.from({ length: remainingStars }, (_, index) => (
    <span key={index} className="star unfilled-star">&#9734;</span>
  ));
  return (
    <div className="starsContainer">
      {filledStars}
      {unfilledStars}
    </div>
  )
}


export default Star
