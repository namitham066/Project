import { useState, useEffect, useRef } from "react";
import React from "react";
import "../Navbar/Navbar.css";
import logo from "../../assets/lime_logo.png";
import { BsFillPencilFill } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import LoginModal from "../../SignUpLogin/Login";
import { useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Navbarmain = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const cartItemCount = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  const handleProfileClick = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLoginSuccess = (token) => {
    console.log("Received Token:", token); 
  
    if (!token) {
      console.error(" No token received!");
      return;
    }
  
    setIsLoggedIn(true);
    localStorage.setItem("authToken", token);
    onClose();
  };
  
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    localStorage.removeItem("authToken"); 
   onOpen();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <div className="logo">
              <img width={120} src={logo} alt="logo" />
            </div>
          </Link>
          <nav>
            <ul>
            <li className="hover-effect">
                <Link to="/women">WOMEN</Link>
               
                <div className="menu">
                <div className="menu-items">
                    <h3>Ethnic Wear</h3>
                    <ul>
                      <li>
                        <Link to={`/women-category/Dresses`}>Dresses</Link>
                      </li>
                      <li>
                        <Link to={`/women-category/SAREES`}>Sarees</Link>
                      </li>
                      <li>
                        <Link to={`/women-category/Stylish Jacket`}>Denim Jackets</Link>
                      </li>
                      <li>
                        <Link to={`/women-category/Ethinc Bottom Wear`}>Ethnic Bottom Wear</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-items">
                    <h3>Western Wears</h3>
                    <ul>
                      <li>
                        <Link to={`/women-category/T-Shirt`}>T-Shirts</Link>
                      </li>
                      <li>
                        <Link to={`/women-category/FROCKS`}>FROCKS</Link>
                      </li>
                      <li>
                        <Link to="#">Casual Shirts</Link>
                      </li>
                      <li>
                      <Link to={`/women-category/Stylish Jacket`}>Jackets</Link>
                      </li>
                      <li>
                        <Link to="#">Sweaters & Sweatshirts</Link>
                      </li>
                    </ul>
                  </div>

                  

                  <div className="menu-items">
                    <h3>Footwear</h3>
                    <ul>
                      <li>
                        <Link to={`/women-category/Casual Shoes`}>Casual Shoes</Link>
                      </li>
                      <li>
                        <Link to={`/women-category/Casual Shoes`}>Sports Shoes</Link>
                      </li>
                      <li>
                        <Link to={`/women-category/Casual Shoes`}>Casual Shirts</Link>
                      </li>
                      <li>
                        <Link to={`/women-category/Casual Shoes`}>Formal Shoes</Link>
                      </li>
                     
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Accessories</h3>
                    <ul>
                      <li>
                        <Link to="#">Caps And Hats</Link>
                      </li>
                      <li>
                        <Link to="#">Lapel Pins & Brooch</Link>
                      </li>
                      <li>
                        <Link to="#">Ties & Pocket Squares</Link>
                      </li>
                      <li>
                        <Link to="#">Cufflinks & Bracelets</Link>
                      </li>
                      <li>
                        <Link to="#">Suits & Blazers</Link>
                      </li>
                      <li>
                        <Link to="#">Handkerchiefs</Link>
                      </li>
                      <li>
                        <Link to="#">Headphones & Speakers</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Brands</h3>
                    <ul>
                      <li>
                        <Link to="#">3 buddy Fashion</Link>
                      </li>
                      <li>
                        <Link to="#">Aurilia</Link>
                      </li>
                      <li>
                        <Link to="#">Azira</Link>
                      </li>
                      <li>
                        <Link to="#">Campus Sutra</Link>
                      </li>
                      <li>
                        <Link to="#">Buggit</Link>
                      </li>
                      <li>
                        <Link to="#">Clovia</Link>
                      </li>
                      <li>
                        <Link to="#">Drape and Dazzle</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-items">
                    <h3>Bottom Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">Jeans</Link>
                      </li>
                      <li>
                        <Link to="#">Casual Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Campus Sutra</Link>
                      </li>
                      <li>
                        <Link to="#">Joggers</Link>
                      </li>
                      <li>
                        <Link to="#">Shorts</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-items">
                    <h3>Sports Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">T-Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Shorts</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Track Pants</Link>
                      </li>
                      <li>
                        <Link to="#">Track Suits</Link>
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </li>
              <li className="hover-effect">
                
                <Link to="/men">MEN</Link>
              
                <div className="menu">
                  <div className="menu-items">
                    <h3>Top Wears</h3>
                    <ul>
                      <li>
                        <Link to={`/men-category/Men T-Shirt`}>T-Shirts</Link>
                      </li>
                      
                      <li>
                        <Link to={`/men-category/casual shirt`}>Casual Shirts</Link>
                      </li>
                      <li>
                        <Link to={`/men-category/Formal shirt`}>Formal Shirts</Link>
                      </li>
                     
                      <li>
                        <Link to={`/men-category/Jackets`}>Jackets</Link>
                      </li>
                   
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Ethnic Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">Kurtas</Link>
                      </li>
                      <li>
                        <Link to="#">Ethnic Wear Sets</Link>
                      </li>
                      <li>
                        <Link to="#">Nehru Jackets</Link>
                      </li>
                     
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Footwear</h3>
                    <ul>
                      <li>
                        <Link to="#">Casual Shoes</Link>
                      </li>
                      <li>
                        <Link to="#">Sports Shoes</Link>
                      </li>
                      <li>
                        <Link to="#">Casual Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Shoes</Link>
                      </li>
                      <li>
                        <Link to="#">Jutis And Mojaris</Link>
                      </li>
                     
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Accessories</h3>
                    <ul>
                      <li>
                        <Link to="#">Caps And Hats</Link>
                      </li>
                      <li>
                        <Link to="#">Lapel Pins & Brooch</Link>
                      </li>
                      <li>
                        <Link to="#">Ties & Pocket Squares</Link>
                      </li>
                      <li>
                        <Link to="#">Cufflinks & Bracelets</Link>
                      </li>
                      <li>
                        <Link to="#">Suits & Blazers</Link>
                      </li>
                      <li>
                        <Link to="#">Handkerchiefs</Link>
                      </li>
                      <li>
                        <Link to="#">Headphones & Speakers</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Brands</h3>
                    <ul>
                      <li>
                        <Link to="#">Arrow</Link>
                      </li>
                      <li>
                        <Link to="#">US Polo Assn</Link>
                      </li>
                      <li>
                        <Link to="#">Aeropostale</Link>
                      </li>
                      <li>
                        <Link to="#">Campus Sutra</Link>
                      </li>
                      <li>
                        <Link to="#">Ruggers</Link>
                      </li>
                      <li>
                        <Link to="#">Canary London</Link>
                      </li>
                      <li>
                        <Link to="#">Hang Up</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-items">
                    <h3>Bottom Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">Jeans</Link>
                      </li>
                      <li>
                        <Link to="#">Casual Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Campus Sutra</Link>
                      </li>
                      <li>
                        <Link to="#">Joggers</Link>
                      </li>
                      <li>
                        <Link to="#">Shorts</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-items">
                    <h3>Sports Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">T-Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Shorts</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Track Pants</Link>
                      </li>
                      <li>
                        <Link to="#">Track Suits</Link>
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </li>
              <li className="hover-effect">
                <Link to="/products">
                  <Link to="/kids">Kids</Link>
                </Link>
                <div className="menu">
                  <div className="menu-items">
                    <h3>Top Wears</h3>
                    <ul>
                      <li>
                        <Link to={`/kids-category/kids T-Shirts`}>T-Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Polo T Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Casual Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Suits & Blazers</Link>
                      </li>
                      <li>
                        <Link to="#">Jackets</Link>
                      </li>
                      <li>
                        <Link to="#">Sweaters & Sweatshirts</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Ethnic Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">Kurtas</Link>
                      </li>
                      <li>
                        <Link to="#">Ethnic Wear Sets</Link>
                      </li>
                      <li>
                        <Link to="#">Nehru Jackets</Link>
                      </li>
                      <li>
                        <Link to="#">Ethnic Bottom Wear</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Footwear</h3>
                    <ul>
                      <li>
                        <Link to="#">Casual Shoes</Link>
                      </li>
                      <li>
                        <Link to="#">Sports Shoes</Link>
                      </li>
                      <li>
                        <Link to="#">Casual Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Shoes</Link>
                      </li>
                      <li>
                        <Link to="#">Jutis And Mojaris</Link>
                      </li>
                      <li>
                        <Link to="#">Slippers & Sandals</Link>
                      </li>
                      <li>
                        <Link to="#">Socks</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Accessories</h3>
                    <ul>
                      <li>
                        <Link to="#">Caps And Hats</Link>
                      </li>
                      <li>
                        <Link to="#">Lapel Pins & Brooch</Link>
                      </li>
                      <li>
                        <Link to="#">Ties & Pocket Squares</Link>
                      </li>
                      <li>
                        <Link to="#">Cufflinks & Bracelets</Link>
                      </li>
                      <li>
                        <Link to="#">Suits & Blazers</Link>
                      </li>
                      <li>
                        <Link to="#">Handkerchiefs</Link>
                      </li>
                      <li>
                        <Link to="#">Headphones & Speakers</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Brands</h3>
                    <ul>
                      <li>
                        <Link to="#">Arrow</Link>
                      </li>
                      <li>
                        <Link to="#">US Polo Assn</Link>
                      </li>
                      <li>
                        <Link to="#">Aeropostale</Link>
                      </li>
                      <li>
                        <Link to="#">Campus Sutra</Link>
                      </li>
                      <li>
                        <Link to="#">Ruggers</Link>
                      </li>
                      <li>
                        <Link to="#">Canary London</Link>
                      </li>
                      <li>
                        <Link to="#">Hang Up</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-items">
                    <h3>Bottom Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">Jeans</Link>
                      </li>
                      <li>
                        <Link to="#">Casual Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Campus Sutra</Link>
                      </li>
                      <li>
                        <Link to="#">Joggers</Link>
                      </li>
                      <li>
                        <Link to="#">Shorts</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-items">
                    <h3>Sports Wear</h3>
                    <ul>
                      <li>
                        <Link to="#">T-Shirts</Link>
                      </li>
                      <li>
                        <Link to="#">Shorts</Link>
                      </li>
                      <li>
                        <Link to="#">Formal Trousers</Link>
                      </li>
                      <li>
                        <Link to="#">Track Pants</Link>
                      </li>
                      <li>
                        <Link to="#">Track Suits</Link>
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </li>
              <li className="hover-effect">
                
                <Link to="#">Home</Link>
              
                <div className="menu">
                  <div className="menu-items">
                    <h3>Bed Linen and Furnishing</h3>
                    <ul>
                      <li>
                        <Link to="#">Bed sheet sets</Link>
                      </li>
                      <li>
                        <Link to="#">Quilts and Comforters</Link>
                      </li>
                      <li>
                        <Link to="#">Blankets</Link>
                      </li>
                      <li>
                        <Link to="#">Bed Covers</Link>
                      </li>
                      <li>
                        <Link to="#">Pillow covers</Link>
                      </li>
                      <li>
                        <Link to="#">Bedsheet</Link>
                      </li>
                      <li>
                        <Link to="#">Sweaters & Sweatshirts</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Bath</h3>
                    <ul>
                      <li>
                        <Link to="#">Towels</Link>
                      </li>
                      <li>
                        <Link to="#">Curtains</Link>
                      </li>
                      <li>
                        <Link to="#">shower Curtains</Link>
                      </li>
                     
                    </ul>
                  </div>

                  <div className="menu-items">
                    <h3>Brands</h3>
                    <ul>
                      <li>
                        <Link to="#">Bella Casa</Link>
                      </li>
                      <li>
                        <Link to="#">Cortina</Link>
                      </li>
                      <li>
                        <Link to="#">Casuals</Link>
                      </li>
                      
                    </ul>
                  </div>

                 
                  
                </div>
              </li>
              <li className="hover-effect">
                <Link style={{ color: "red", fontWeigth: "bold" }} to="#">
                  OFFERS
                </Link>
              </li>
              <li className="hover-effect">
                <Link style={{ color: "red", fontWeigth: "bold" }} to="#">
                  VMART
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-item item-right">
            <div className="icon-box">
              <span className="icon-div">
                <BsFillPencilFill className="header-icon" />
                <p className="icon-name">SCRAPBOOKS</p>
              </span>

             
    <span className="icon-div">
      <AiOutlineSearch className="header-icon" />
      <p className="icon-name">SEARCH</p>
    </span>

    <Link to="/cart" className="cart-link">
        <span className="icon-div">
          <HiShoppingCart className="header-icon" />
          <p className="icon-name">CART</p>
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </span>
      </Link>

   
      <li className="profile-dropdown" ref={profileRef}>
                <span className="icon-div" onClick={handleProfileClick}>
                  <AiOutlineUser className="header-icon" />
                  <p className="icon-name">PROFILE</p>
                </span>
                {showProfileDropdown && (
                  <div className="dropdown-content">
                    <p>Welcome!</p>
                    <p>To view account details {isLoggedIn}</p>
                    
                    
                    {isLoggedIn ? (
                      <p onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
                        Logout
                      </p>
                    ) : (
                      <p onClick={onOpen} style={{ cursor: "pointer", color: "red" }}>
                        Login
                      </p>
                    )}
                    <Link to="/orders">Orders</Link>
                    <Link to="/returns">Return & Replacement</Link>
                    <Link to="/credits">LR Credits</Link>
                    <Link to="/support">Customer Support</Link>
                    <Link to="/faq">FAQ & Help</Link>
                    <p>हिन्दी</p>
                  </div>
                )}
              </li>


  </div>
          </div>
          <LoginModal isOpen={isOpen} onClose={onClose} onLoginSuccess={handleLoginSuccess} />
        </div>
      </header>
    </>
  );
};

export default Navbarmain;
