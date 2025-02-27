import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Homepage/Home";
import Login from "../SignUpLogin/Login";
import SingleProductPage from "../Components/Homecategories/SingleProductpage";
import WomenSubcategory from "../Pages/Homepage/WomenSubcategory";
import MenSubcategory from "../Pages/Homepage/MenSubcategory";
import KidsSubcategory from "../Pages/Homepage/KidsSubcategory";
import CartPage from "../Pages/cart";
import ProductsHomepage from "../Components/HomepageComp/ProductsHomepage";
import PaymentPage from "../Components/Paymentpage";
import Signup from "../SignUpLogin/Signup";
import ForgotPassword from "../SignUpLogin/forgotPassword";
import ResetPassword from "../SignUpLogin/resetpassword";
import VendorDashboard from "../Components/Vendorproducts";

const Allroutes = () => {
  const [loggedInVendor, setLoggedInVendor] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role === "vendor") {
      setLoggedInVendor(storedUser.vendorDetails);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/women-category/:subcategory" element={<WomenSubcategory />} />
      <Route path="/men-category/:subcategory" element={<MenSubcategory />} />
      <Route path="/kids-category/:subcategory" element={<KidsSubcategory />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products/:category/:subcategory" element={<ProductsHomepage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      {/* Pass vendor data to VendorDashboard */}
      <Route path="/vendor-dashboard" element={<VendorDashboard vendor={loggedInVendor} />} />
    </Routes>
  );
};

export default Allroutes;
