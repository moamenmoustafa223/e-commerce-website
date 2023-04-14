import React from 'react'
import styles from "./ProductDetails.module.css"
import  { useEffect, useState } from 'react'
import  axios  from 'axios'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
export default function ProductDetails() {


  let {id}=useParams()
  const [productDetails,setProductDetails]=useState({})
  
  async function getProductDetails(){
    let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data)
    
    
  }
  useEffect(()=>{
getProductDetails()
  },[])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
   <div className="container ">
    <div className="row align-items-center">
      <div className="col-md-4">

      <Slider {...settings}>

     {productDetails?.images?.map((img)=><div>
      <img width={'100%'} src={productDetails.imageCover} alt="" />
     
     </div>

     )}
    </Slider>
      
      </div>
      <div className="col-md-8">
        <h1>{productDetails.title}</h1>
        <p>{productDetails.description}</p>


        <div className="d-flex justify-content-between">
      <p>{productDetails.price} EGP</p>
      <div >
         <i className='fa fa-star rating-color'></i>
         {productDetails.ratingsAverage}
      </div>
    </div>
    <button className='btn bg-main text-white w-100'>+ ADD</button>
      </div>
    </div>
   </div>
    </>
  )
}
