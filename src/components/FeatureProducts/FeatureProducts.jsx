import React, { useContext, useEffect, useState } from 'react'
import styles from "./FeatureProducts.module.css"
import  axios  from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';


export default function FeatureProducts() {
  let {creatCart,setNumOfCartItems}=useContext(CartContext)
  const [allProducts,setAllProducts]=useState([])
  
async function getProduct(){
  let {data}= await axios.get("https://route-ecommerce.onrender.com/api/v1/products")
  console.log(data);
  setAllProducts(data.data)
  
}

async function generateCart(productId){
  let response= await creatCart(productId)
 
  if(response.data.status ==="success"){
    toast.success(response.data.message,{
      position:'bottom-right',
      className:"textcenter box-shadow"
      
    })
    setNumOfCartItems(response.data.numOfCartItems)
  }else{
    toast.error(response.data.message,{
      position:'bottom-right',
      className:"textcenter box-shadow"
    })
  }
 
}
useEffect(()=>{
getProduct()
},[])
  return (
    <>
    <div className="container py-5">
      <div className="row g-3" >
    {allProducts?.map((product,index)=>  <div key={index} className="col-md-2">
    <div className="product p-3">

<Link to={"product-details/"+product.id}>
<img src={product.imageCover} className='img-fluid' alt="" />
<p className='text-main fw-semi-bold'></p>
    <h3 className='fs-6'>{product.title.split(" ").splice(0,2).join(" ")}</h3>
    <div className="d-flex justify-content-between">
      <p>{product.price} EGP</p>
      <div >
         <i className='fa fa-star rating-color'></i>
         {product.ratingsAverage}
      </div>
     

    </div>
</Link>
    
    <button onClick={()=>{generateCart(product?._id)}} className='btn bg-main text-white w-100'>+ ADD</button>
</div>

      
      </div> )}
      
   
      </div>
    </div>
    </>
  )
}
