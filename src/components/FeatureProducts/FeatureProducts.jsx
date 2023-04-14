import React, { useEffect, useState } from 'react'
import styles from "./FeatureProducts.module.css"
import  axios  from 'axios'
import { Link } from 'react-router-dom'


export default function FeatureProducts() {
  const [allProducts,setAllProducts]=useState([])
  
async function getProduct(){
  let {data}= await axios.get("https://route-ecommerce.onrender.com/api/v1/products")
  setAllProducts(data.data)
  
}
useEffect(()=>{
getProduct()
},[])
  return (
    <>
    <div className="container py-5">
      <div className="row g-3" >
    {allProducts.map((product)=>  <div key={product.id} className="col-md-2">
    <div className="product p-3">

<Link to={"product-details/"+product.id}>
<img src={product.imageCover} className='img-fluid' alt="" />
<p className='text-main fw-semi-bold'>{product.brand.name}</p>
    <h3 className='fs-6'>{product.title.split(" ").splice(0,2).join(" ")}</h3>
    <div className="d-flex justify-content-between">
      <p>{product.price} EGP</p>
      <div >
         <i className='fa fa-star rating-color'></i>
         {product.ratingsAverage}
      </div>
     

    </div>
</Link>
    
    <button className='btn bg-main text-white w-100'>+ ADD</button>
</div>

      
      </div> )}
      
   
      </div>
    </div>
    </>
  )
}
