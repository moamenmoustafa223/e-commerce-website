import React, { useState } from 'react'
import styles from "./Login.module.css"

import {Formik, useFormik} from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Login({saveUser}) {

  const [isLoading,setIsLoading]=useState(false)
  const [errMessage,setErrMessage]=useState(null)
let navigate = useNavigate()

  async function login(values){
    
    setIsLoading(true)
    setErrMessage(null)
    let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((err)=>{
    setIsLoading(false)
    setErrMessage(err.response.data.message)
    })
    if(data.message == "success"){
      setIsLoading(false)
      localStorage.setItem("userToken",data.token)
      saveUser()
      navigate("/")
    }
  }


let mySchema= Yup.object({
 
  email: Yup.string().email('Invalid email address').required('Email is Required'),
  password: Yup.string().matches(/^[A-Z][a-z0-9]{3,15}$/,"invail password").required("password is required"),
  
        
})


 

  let formik = useFormik({
    initialValues:{
     
      email:"",
      password:"",
    
    },validationSchema:mySchema,
    onSubmit:(values)=> login(values)
  
  })


  return (
    <>
   <div className="container my-5 w-75">
    <h3>Login Now</h3>
   
    {errMessage?  <div className="alert alert-danger">{errMessage} </div>:"" }
    <form  onSubmit={formik.handleSubmit}>
   
       <label htmlFor="email" className='mb-2'>Email:</label>
     <input type="email" className='form-control mb-3' id='email' name='email'
      value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>

{formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : "" }

       <label htmlFor="password" className='mb-2'>Password:</label>
     <input type="password" className='form-control mb-3' id='password' name='password'
      value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>

{formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : "" }

       

{isLoading?  <button className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i> </button> :    <button className='btn bg-main text-white me-2' type='submit'>Login</button>}
   
     
    </form>
   </div>

    </>
  )
}
