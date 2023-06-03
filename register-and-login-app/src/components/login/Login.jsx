import React, { useState } from 'react'
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
// import { unstable_HistoryRouter } from 'react-router-dom'

const Login = ({setLoginUser}) =>{

    const navigate = useNavigate()

    const [user , setUser] = useState({
        email: "",
        password: ""
    })


    const handlechange = e=>{
        const {name , value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const login = () =>{
        axios.post("http://localhost:9002/login" , user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            navigate("/")
        })
        
    }



    return(
        <div className='login'>
            <h1>Login</h1>
            <input type="text" placeholder='Enter your email' name='email' value={user.email} onChange={handlechange}/>
            <input type="text" placeholder='Enter your password' name='password' value={user.password} onChange={handlechange}/>
            <div className="button" onClick={login}>Login</div>
            <div>OR</div>
            <div className="button" onClick={()=> navigate("/register")}>Register</div>
        </div>
    )
}

export default Login