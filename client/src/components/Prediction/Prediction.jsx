
import React, { useState } from 'react'

const Prediction = () => {
const [photo,setphoto]=useState();
const [photopreview,setPhotoPreview]=useState();
const [predictionResult,setPredictionResult]=useState('');
const [base64,setBase64]=useState("");
const uploadphoto=(e)=> {
const file=e.target.files[0];
const Reader=new FileReader();
Reader.readAsDataURL(file);
Reader.onload=(e)=>{

if(Reader.readyState===2){
setphoto(Reader.result);
setPhotoPreview(Reader.result);
setBase64(e.target.result);


}


}

        
      };
    const parts = base64.split(',');    
        const dataPart = parts[1]; 
        // console.log(dataPart);
      
const handlesubmit=async()=>{
try{
const response=await fetch("https://15a4-35-237-64-17.ngrok.io/predict2",{
method:'POST',
headers:{
'Content-Type': 'application/json',
},
body:JSON.stringify({image_base64:dataPart}),
})
if(response.ok){
const data=await response.json();
setPredictionResult(data);
console.log(predictionResult.class_name[0]);
}
else{
console.error('Error:', response.statusText);


}






}
catch(error){
console.log(error);   



}





}      




    return (
    <div>
      <h1>
        Upload Your image
      </h1>
<input type='file' name="plant" accept='image/*' onChange={uploadphoto}/>
<h3>image</h3>
<image src={photopreview}/>  
<button onClick={handlesubmit}>Submit</button>
<h4>Results</h4>
{predictionResult?<p>{predictionResult.class_name[0]}</p>:null
          
        }









    </div>
  )
}

export default Prediction
