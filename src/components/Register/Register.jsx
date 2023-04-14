import React, { useState } from 'react'
import styles from "./Register.module.css"
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [isLoading,setIsLoading]=useState(false)
  const [errMessage,setErrMessage]=useState(null)
let navigate = useNavigate()

  async function register(values){
    
    setIsLoading(true)
    setErrMessage(null)
    let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((err)=>{
    setIsLoading(false)
    setErrMessage(err.response.data.errors.msg)
    })
    if(data.message === "success"){
      setIsLoading(false)

      navigate("/login")
    }
  }


let mySchema= Yup.object({
  name: Yup.string()
        .min(3, 'Must be 3 characters at least')
         .max(15, 'Must be 15 characters or less')
         .required('Name is Required'),
  email: Yup.string().email('Invalid email address').required('Email is Required'),
  password: Yup.string().matches(/^[A-Z][a-z0-9]{3,15}$/,"invail password").required("password is required"),
  rePassword: Yup.string().oneOf([Yup.ref('password')],"password and rePassword Not Match").required("rePassword is required"),
  phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"invail phone Format").required("phone is required"),
        
})

  // const validate = values => {
  //   const errors = {};
  //   if (!values.name) {
  //     errors.name = 'Required';
  //   } else if (values.name.length > 15) {
  //     errors.name = 'Must be 15 characters or less';
  //   }
  
  //   if (!values.email) {
  //     errors.email = 'Required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if (!values.password) {
  //     errors.password = 'Required';
  //   } else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
  //     errors.password = 'Invalid password';
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = 'Required';
  //   } else if ( values.rePassword!= values.password) {
  //     errors.password = 'password and rePassword Not Match';
  //   }

  //   if (!values.phone) {
  //     errors.phone = 'Required';
  //   } else if (!/^01[0125][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = 'Invalid phone';
  //   }

  //   return errors;
  // };

  let formik = useFormik({
    initialValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },validationSchema:mySchema,
    onSubmit:(values)=> register(values)
  
  })
  return (
    <>
   <div className="container my-5 w-75">
    <h3>Register Now</h3>
   
    {errMessage?  <div className="alert alert-danger">{errMessage} </div>:"" }
    <form  onSubmit={formik.handleSubmit}>
    <label htmlFor="name" className='mb-2'>Name:</label>
     <input type="text" className='form-control mb-3' id='name' name='name'
      value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
  
      {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div> : "" }

       <label htmlFor="email" className='mb-2'>Email:</label>
     <input type="email" className='form-control mb-3' id='email' name='email'
      value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>

{formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : "" }

       <label htmlFor="password" className='mb-2'>Password:</label>
     <input type="password" className='form-control mb-3' id='password' name='password'
      value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>

{formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : "" }

       <label htmlFor="rePassword" className='mb-2'>RePassword:</label>
     <input type="password" className='form-control mb-3' id='rePassword' name='rePassword'
      value={formik.values.rePassword} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>

{formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger">{formik.errors.rePassword}</div> : "" }

<label htmlFor="phone" className='mb-2'>phone:</label>
     <input type="tel" className='form-control mb-3' id='phone' name='phone'
      value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

{formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div> : "" }

{isLoading?  <button className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i> </button> :    <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white me-2' type='submit'>register</button>}
   
     
    </form>
   </div>
    </>
  )
}
