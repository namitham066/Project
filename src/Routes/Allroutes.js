import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Homepage/Home";
import Login from "../SignUpLogin/Login";
import Products from "../Productspage/Products";



const Allroutes = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/products/:category" element={<Products />} />  

    </Routes>
  );
};

export default Allroutes;
