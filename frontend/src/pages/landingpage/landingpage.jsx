import React from 'react'
import { Link } from 'react-router-dom'
import "./landingpage.scss"
import BackgroundImage from '../../assests/bg.png'
const landingpage = () => {
    return (
        <header style={ HeaderStyle }>
            <h1 className="main-title text-center">Admin Dashboard</h1>
            <p className="main-para text-center">Transport APP</p>
            <div className="buttons text-center">
                <Link to="/log">
                    <button className="primary-button">log in</button>
                </Link>
            
            </div>
        </header>
    )
}
const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}

export default landingpage