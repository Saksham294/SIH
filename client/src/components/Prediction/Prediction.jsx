import React, { useState } from 'react'
import { Button, Typography } from '@mui/material';
import './Prediction.css'

const Prediction = () => {
  const [photo, setphoto] = useState();
  const [photopreview, setPhotoPreview] = useState();
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
      const response = await fetch("https://242b-35-199-150-201.ngrok.io/predict2", {
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
        setPlantName(data.class_name[0]);
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
      <input type='file' name="plant" accept='image/*' onChange={uploadphoto} />
      <Typography variant='h6'>Image</Typography>
      <img src={photopreview} />
      <button className='predictionBtn' onClick={handlesubmit}>Submit</button>
      <Typography variant='h6'>Result</Typography>
      {predictionResult ? <p className='plantName'>{predictionResult.class_name[0]}</p> : null}
      {knowMore?<Button variant='contained' color='primary'>अधिक जानकारी के लिए यहां क्लिक करें</Button>:null}
    </div>
  )
}

export default Prediction
