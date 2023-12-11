import React from "react";
import "./Header.css";
import Tools from "./Tools";



function Header() {
  return (
    <div className="header__container">

      <div className="header__left">
        <img
          src={require("../images/boxing-ring.png")}
          alt="header__logo"
          className="header__logo"
        />
        <h1>Boxing Legends</h1>
      </div>

      <div className="header__right">
        <Tools />
        {/* <div className="header__home">
            <h2>Home</h2>
        </div> */}
      </div>
    </div>
  );
}

export default Header;
