import React, { useState } from "react";
import logo from "../logo.png";

function LoginPage() {
  let [login, setLogin] = useState({
    email: "",
    password: ""
  });

  function handleChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;

    setLogin((prevLogin) => {
      if (inputName === "email") {
        return { email: newValue, password: prevLogin.password };
      } else if (inputName === "password") {
        return { email: prevLogin.email, password: newValue };
      }
    });
  }

  return (
    <div>
      <div className="title">
        <h1>
          Plan Finder
          <img src={logo} alt="logo" />
        </h1>
      </div>
      <div className="loginBox">
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
          <button>Log In</button>
        </form>
        <div className="signUp">New user? Sign up here</div>
      </div>
    </div>
  );
}

export default LoginPage;
