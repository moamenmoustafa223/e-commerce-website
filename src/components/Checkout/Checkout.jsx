import React, { useContext, useState } from 'react'
import styles from "./Checkout.module.css"
import * as Yup from 'yup';

import { Formik, useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
export default function Checkout() {

  let {generateOnlinePayment,cartId}= useContext(CartContext)


async function handlePayment(values){
  console.log(values);
  let {data}= await generateOnlinePayment(cartId,values)
 console.log(data);
 if(data.session){
 console.log(data.session.url);
 window.location.href= data.session.url
 }
}

let mySchema= Yup.object({
  details: Yup.string()
        .min(3, 'Must be 3 characters at least')
         .max(15, 'Must be 15 characters or less')
         .required('Details is Required'),
  city: Yup.string().required('City name is Required'),
 
  phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"invail phone Format").required("phone is required"),
        
})

  let formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:"",
    },validationSchema:mySchema
    ,onSubmit:  (values)=> handlePayment(values)
  })

  return (
    <>

  <div className="container py-5">
    <form className='w-75 mx-auto' onSubmit={formik.handleSubmit} action="">

      <label htmlFor="details">Details</label>
      <input type="text" className='form-control mb-3' id='details' name='details' 
      onBlur={formik.handleBlur} 
      value={formik.values.details}
       onChange={formik.handleChange}/>
 {formik.errors.details && formik.touched.details? <div className="alert alert-danger">{formik.errors.details}</div> : "" }



 <label htmlFor="city">City</label>
      <input type="text" className='form-control mb-3' id='city' name='city' 
      onBlur={formik.handleBlur} 
      value={formik.values.city}
       onChange={formik.handleChange}/>
 {formik.errors.city && formik.touched.city? <div className="alert alert-danger">{formik.errors.city}</div> : "" }

 <label htmlFor="phone">Phone</label>
      <input type="tel" className='form-control mb-3' id='phone' name='phone' 
      onBlur={formik.handleBlur} 
      value={formik.values.phone}
       onChange={formik.handleChange}/>
 {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div> : "" }

 <button type='submit'  className='btn btn-outline-info w-100 btn-lg'>Pay</button>
    </form>
  </div>
    </>
  )
}
