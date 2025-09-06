import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Navigation from './components/layout/header/Navigation'
import Home from './components/Home/Home'
import ProductDetail from './components/layout/product/ProductDetails'
import Checkout from "./components/Cart/Checkout"
import Search from './components/layout/product/Search'
import Products from './components/layout/product/products'
import LoginSignUp from './components/User/LoginSignUP'
import RegisterUser from './components/User/RegisterUser'
import Footer from './components/layout/footer/Footer'

function App() {
  
  return (
    <>

      <Navigation/>
      <br />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/keyword" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout/>} />

        <Route path='/search'element={<Search/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>

        <Route path='register' element={<RegisterUser/>}/>
      </Routes>
      {/* <ProductList/> */}
      <Footer/>
      </>
  )
}

export default App
