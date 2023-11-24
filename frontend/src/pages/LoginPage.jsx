import React, { useState } from "react";

import Header from "../components/Header.jsx"
import {Link, useNavigate} from "react-router-dom";
import { loginUser } from "../utils/utils.js";

function LoginPage() {

  let navigate = useNavigate(); 
  
  function routeChange(){ 
    let path = "/signup"; 
    navigate(path);
  }



  let [login, setLogin] = useState({
    email: "",
    password: ""
  });
  
  function handleChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;

    setLogin({
      ...login,
      [inputName]: newValue
  });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(login);
    console.log(token['data'])

    if ("success" in token['data']){
      routeChange()
    }

    
    // setToken(token);
  }

  return (
    <div>
      <Header />
      <div className="blueBox">
        <h2>LOG IN</h2>
        <form>
          Email
          <input name="email" onChange={handleChange} value={login.email} />
          Password
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={login.password}
          />
          <button onClick={handleSubmit}>Log In</button>
        </form>
        <div className="signUp">
          <Link to="/signup" style={{textDecoration: "none"}}>New user? Sign up here</Link>
        </div>  
      </div>
    </div>
  );
}

export default LoginPage;
