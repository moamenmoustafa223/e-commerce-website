import styles from "./Categories.module.css"
import Slider from "react-slick";
import React, { useEffect, useState } from 'react'
import  axios  from 'axios'

export default function Categories() {
  const [categories,setCategories]=useState([])
  
  async function getCategory(){
    let {data}= await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
    setCategories(data.data)
    
    
  }
  useEffect(()=>{
  getCategory()
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };
  return (
    <>

     <Slider {...settings}>
     {categories.map((category)=><div>
      <img height={300} width={'100%'} src={category.image} alt="" />
      <h3 className="fs-6">{category.name} </h3>
     </div>

     )}
    </Slider>

    </>
  )
}
