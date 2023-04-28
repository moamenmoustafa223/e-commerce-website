import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './components/Home/Home';
import { Offline, Online } from "react-detect-offline";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import ProductsDetails from "./components/ProductDetails/ProductDetails"
import './App.css';
import jwtDecode from "jwt-decode"
import { useEffect, useState } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';




function App() {
 
const [userData,setUserData]=useState(null)

useEffect(()=>{
   
  if(localStorage.getItem("userToken")){
    saveUser()
  }

},[])
 function saveUser(){
  let encodedToken = localStorage.getItem("userToken")
  let decodedToken = jwtDecode(encodedToken);
  setUserData(decodedToken)
 }



 const routes= createBrowserRouter([
  {path:"",
  element:<Layout userData={userData} setUserData={setUserData}/>,
  children:[
    {index:true,element:
      <ProtectedRoutes>
        <Home/>
  </ProtectedRoutes>},
    
    
    {path:"login",element:<Login saveUser={saveUser} />},
    {path:"register", element:<Register/>},
    {path:"cart",element: <ProtectedRoutes>
    <Cart/>
  </ProtectedRoutes>},
  {path:"checkout",element: <ProtectedRoutes>
  <Checkout/>
</ProtectedRoutes>},
    {path:"products",element: <ProtectedRoutes>
    <Products/>
  </ProtectedRoutes>},
     {path:"allorders",element: <ProtectedRoutes>
      <AllOrders/>
     </ProtectedRoutes>},
  {path:"product-details/:id", element:<ProductsDetails/> },

    {path:"*",element:<NotFound/>}
  ]},
])


  return (<>
  <Offline> <span className='network-status box-shadow p-3 '>you're offline</span>  </Offline>
<CartContextProvider>
<Toaster></Toaster>
  <RouterProvider router={routes}>
  
  </RouterProvider>
  </CartContextProvider>
  
  
  </>

  );
}

export default App;
