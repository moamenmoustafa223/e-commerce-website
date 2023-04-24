import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css"
import { CounterContext } from '../../Context/CounterContext'
import { CartContext } from '../../Context/CartContext'
import { Offline, Online } from "react-detect-offline";
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';

export default function Cart() {

const [cartDetails,setCartDetails]=useState({})
 let {getCart,updateCart,removeCartItem}=useContext(CartContext)
 
  async function getCartDetails(){
    let response= await getCart()
console.log(response);
setCartDetails(response.data)
 }
 async function updateCartHandler(id,count){
  let response= await updateCart(id,count)
  if(count<1){
    deleteCartHandler(id);
  }
console.log(response);
setCartDetails(response.data)
}
async function deleteCartHandler(id){
  let response= await removeCartItem(id)
console.log(response);
setCartDetails(response.data)
}
 useEffect(()=>{
getCartDetails()
 },[])
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Shop Cart</title>
              
            </Helmet>
     {/* {toast.error( <Offline> you're offline </Offline>,{
      position:'bottom-right',
      className:"textcenter box-shadow"
    })} */}
  <Offline> <span className='network-status box-shadow p-3 '>you're offline</span>  </Offline>
   <div className="container py-5 my-5">
    <div className="bg-main-light p-5">
    <h3>Cart Details</h3>
    <h4>Total Price:{cartDetails?.data?.totalCartPrice} </h4>
    {cartDetails?.data?.products.map((product)=>   <div key={product.product._id} className="row border-bottom border-bottom-danger p2 ">
    <div className="col-md-1">
      <img src={product.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-11 d-flex justify-content-between">
      <div>
      <h4>{product.product.title}</h4>
      <p className='text-main'>{product.price} EGP</p>
      <button className='btn text-danger ' onClick={()=> deleteCartHandler(product.product._id)}><i className='fa fa-trash'></i> Remove</button>
      </div>
      <div className='d-flex align-items-center'>
        <button className='btn btn-cart bg-main text-white' onClick={()=>updateCartHandler(product.product._id,product.count+1)}>+</button>
        <p className='mx-3 m-0'>{product.count} </p>
        <button className='btn btn-cart btn-danger text-white' onClick={()=>updateCartHandler(product.product._id,product.count-1)}>-</button>
      </div>
   
    </div>
    </div>)}

   
    </div>
  
   </div>
   
    </>
  )
}
