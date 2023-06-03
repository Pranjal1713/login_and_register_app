import React from 'react'
import "./Homepage.css"
import { useNavigate } from 'react-router-dom'

const Homepage = (props) =>{

    const navigate = useNavigate()

    return(
        <div className='homepage'>
            <h1>Hello {props.usern}</h1>
            <div className="button" onClick={()=> navigate("/login")}>Logout</div>
        </div>
    )
}

export default Homepage