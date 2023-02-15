import '../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   



    const handleSubmit = (event) => {
        event.preventDefault();
       
        const payload = {
            email,
            password
        }

        // endpoint for generating user
        fetch("http://localhost:7777/user/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
           if(res.token){
            localStorage.setItem("REG", res.token)
           }
        })
        .catch((err)=>console.log(err))

        navigate('/picture');
    }
  return (
    <div className="container">
    <h1>Login Here</h1>
    <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
    <br/>
    <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
    <br/>
   

    <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login