import React from "react";
import logo from "../logo.png";

function Header() {
   return( <div className="title">
        <h1>
          Plan Finder
          <img src={logo} alt="logo" />
        </h1>
      </div>)
}

export default Header;