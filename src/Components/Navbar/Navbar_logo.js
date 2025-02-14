import React from "react";
import logo from "../../assets/lime_logo.png";
import "../../Components/Navbar/Navbar.css";

const Navbar_logo = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row v-center">
            <div className="header-item item-left">
              <div className="logo">
                <img src={logo} alt="logoo" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar_logo;
