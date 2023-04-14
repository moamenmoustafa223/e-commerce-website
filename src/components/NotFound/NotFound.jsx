import React from 'react'
import styles from "./NotFound.module.css"
import err from "../../assets/images/error.svg"
export default function NotFound() {
  return (
    <>
 <div className="container text-center w-50">
  <img src={err} className='w-100' alt="" />

 </div>
    </>
  )
}
