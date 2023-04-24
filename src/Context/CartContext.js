import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(0)
export default function CartContextProvider(props){

let headers= {token: localStorage.getItem("userToken")}


function creatCart(productId){
  return  axios.post("https://route-ecommerce.onrender.com/api/v1/cart",
    {productId:productId},
    {
        headers
    }).then(res => res).catch(err => err)
}
function getCart(){
    return  axios.get("https://route-ecommerce.onrender.com/api/v1/cart",
      
      {
          headers
      }).then(Response => Response)
      .catch(err => err)
  }

  function updateCart(id,count){
    return  axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
      {count},
      {
          headers
      }).then(res => res).catch(err => err)
  }
  function removeCartItem(id){
    return  axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
    
      {
          headers
      }).then(res => res).catch(err => err)
  }
    return <CartContext.Provider value={{creatCart,getCart,updateCart,removeCartItem}}>


            {props.children}

    </CartContext.Provider>
}