import React, { useState } from 'react'
import { Button, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch } from 'react-redux';
import { getProductByName } from '../../Actions/productActions';
import { useEffect } from 'react';

import './Prediction.css'

const Prediction = () => {

  const dispatch=useDispatch();
  

  const [photo, setphoto] = useState();
  const [photopreview, setPhotoPreview] = useState();
  const [isPhoto,setIsPhoto]=useState(false);
  const [plantFound,setPlantFound]=useState("")
  const [predictionResult, setPredictionResult] = useState('');
  const [plantName,setPlantName]=useState('');
  const [base64, setBase64] = useState("");
  const [knowMore,setKnowMore]=useState(false);
  const uploadphoto = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = (e) => {

      if (Reader.readyState === 2) {
        setphoto(Reader.result);
        setPhotoPreview(Reader.result);
        setBase64(e.target.result);
      }
    }
  };


  const parts = base64.split(',');
  const dataPart = parts[1];
  // console.log(dataPart);

  const handlesubmit = async () => {
    try {
      const response = await fetch("https://b97b-34-168-237-63.ngrok.io/predict2", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_base64: dataPart }),
      })
      if (response.ok) {
        const data = await response.json();
        setPredictionResult(data);
        console.log(data)
        // setPlantFound(data.class_name[0]);
        setPlantName(data.class_name[0]);
        dispatch(getProductByName(data.class_name[0]));
        console.log(plantName)
        setKnowMore(true);
      }
      else {
        console.error('Error:', response.statusText);
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='predictionContainer'>
     <Typography variant='h2'>
        Upload Your Image
        </Typography>
      <label for='inputImg' className='imgUpload'>
        <CameraAltIcon sx={{fontSize:"100px"}} className='cameraIcon' />
      <input id='inputImg' type='file' name="plant" accept='image/*' onChange={uploadphoto} />
      </label>
      <Typography variant='h6'>Click On Camera :)</Typography>
      <img src={photopreview} />
      <button className='predictionBtn' onClick={handlesubmit}>Submit</button>
      {predictionResult ? <p className='plantName'>It is </p> : null}
      {knowMore?<Button className='moreInfoBtn' variant='contained' color='primary'>अधिक जानकारी के लिए यहां क्लिक करें</Button>:null}
    </div>
  )
}

export default Prediction
