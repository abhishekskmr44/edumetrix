import '../App.css';
import React, { useState, useEffect } from 'react'

const Picture = () => {
    
    const [pictures,setPictures] = useState([])
   const token = localStorage.getItem("REG")
    const getData = () => {
        fetch("http://localhost:7777/picture",{
          method:"GET", 
          headers:{
            'Authorization':`Bearer ${token}`
          }
          
        })
        .then((res)=>res.json())
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }

useEffect(()=> {
    getData()
},[])
   

   if(!localStorage.getItem("REG")){
    return <h1>Please Login again</h1>
   }     
    
  return (
    <div>

   
    <h1>Welcome</h1>
    
    <div><img src="https://images.unsplash.com/photo-1603483080228-04f2313d9f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"/></div>
   
    {
    pictures.length>0 && pictures.map((picture,index)=>{
        return <div>
        <p key={index}>
        {picture.Heading}
        </p>
        <button>DELETE</button>
        </div>
    })
   }
   
    </div>
  )
}

export default Picture