import React,{useEffect} from 'react'
import { Typography } from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import './MyPurchases.css'

const MyPurchases = () => {
    const dispatch = useDispatch()
    let {loading,user} = useSelector(state => state.user)
    let myPurchases=[]
    if(user){
        myPurchases = user.itemsBought
    }
    console.log(myPurchases)

    return loading==undefined||loading==true? null:(
        <div className='myPurchasesContainer'>
            <Typography variant='h2'>Your Purchases</Typography>
        </div>
    )
}

export default MyPurchases
