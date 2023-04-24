import React, { useContext } from 'react'
import styles from "./ProductDetails.module.css"
import  { useEffect, useState } from 'react'
import  axios  from 'axios'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';
export default function ProductDetails() {
  let {creatCart}=useContext(CartContext)
 

  let {id}=useParams()
  const [productDetails,setProductDetails]=useState({})
  
  async function getProductDetails(){
    let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data)
    
    
  }
  
  async function generateCart(productId){
    let response= await creatCart(productId)
   
    if(response.data.status ==="success"){
      toast.success(response.data.message,{
        position:'bottom-right',
        className:"textcenter box-shadow"
      })
    }else{
      toast.error(response.data.message,{
        position:'bottom-right',
        className:"textcenter box-shadow"
      })
    }
   
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
      <Helmet>
                <meta charSet="utf-8" />
                <title>SProduct Details</title>
              
            </Helmet>
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
    <button  onClick={()=>{generateCart(productDetails.id)}} className='btn bg-main text-white w-100'>+ ADD</button>
      </div>
    </div>
   </div>
    </>
  )
}
