import React from 'react'
import styles from "./NotFound.module.css"
import err from "../../assets/images/error.svg"
import {Helmet} from "react-helmet";
export default function NotFound() {
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Not Found 404</title>
              
            </Helmet>
 <div className="container text-center w-50">
  <img src={err} className='w-100' alt="" />

 </div>
    </>
  )
}
