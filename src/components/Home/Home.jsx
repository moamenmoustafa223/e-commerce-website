import React from 'react';
import styles from "./Home.module.css";
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import Categories from '../Categories/Categories';
import {Helmet} from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
              
            </Helmet>
<Categories></Categories>
<FeatureProducts></FeatureProducts>

    </>
  )
}

