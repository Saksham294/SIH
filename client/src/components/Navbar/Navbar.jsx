import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus'
import './Navbar.css'
import { Button, Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBar from './MenuBar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import logo from './logo.json'

const Navbar = () => {

    const { isAuthenticated } = useSelector((state) => state.user);
    return (
        <div className='navMain'>
            <img src={logo.logo} alt="logo" className='logo' />
            <div className="nav">

                <Link to='/'>  <div className="home">Home</div></Link>

                <Link to='/allProducts'><div className="about-us">Explore</div></Link>
            </div>
            {isAuthenticated ? <MenuBar className='menuBar' /> : <div className="login"><Link className='link' to="/login" style={{ textDecoration: 'none' }}>Login</Link></div>}
            {isAuthenticated ? <Link to='/cart'><ShoppingCartIcon className='cartIcon' sx={{
                fontSize: "2rem", margin: "1.2rem", marginTop: "1.8rem", color: "#08d4a4",
                ":hover": { cursor: "pointer", color: "#05c498" }
            }} /></Link> : null}
            <Link to='/predict'>
            <IconButton><CameraAltIcon sx={{
                fontSize: "2rem", margin: "1.2rem", marginTop: "1.2rem", color: "#78b343",
                ":hover": { cursor: "pointer", color: "#f8941c" }
            }}   /> </IconButton></Link>
        </div>
    )
}

export default Navbar

