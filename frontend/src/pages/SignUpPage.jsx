import React, { useState } from "react";

import Header from "../components/Header.jsx"
import {Link} from "react-router-dom";
import info from "../utils/info.js"

function SignUpPage() {

    console.log()

    let [signUp, setSignUp] = useState({
        d_name: "",
        year: "",
        email: "",
        password: ""

    });

    function handleChange(event) {
        const newValue = event.target.value;
        const inputName = event.target.name;

        setSignUp({
            ...signUp,
            [inputName]: newValue
        });
    }

    return (
        <div>
        <Header />
        <div className="blueBox">
            <h2>Welcome...</h2>
            <form>
            Display Name
            <input name="d_name" onChange={handleChange} value={signUp.d_name} />

            Intended Program(s) of Study
            <select>
                <option value="choose"></option>

                {info['major'].map((major, index) =>
                    <option key={index} value={major}>{major}</option>
                )}
            </select>

            Expected Graduation Year
            <input name="year" onChange={handleChange} value={signUp.year} />

            School
            <select>
                <option value="choose"></option>

                {info['school'].map((major, index) =>
                    <option key={index} value={major}>{major}</option>
                )}

            </select>

            Email
            <input name="email" onChange={handleChange} value={signUp.email} />

            Password
            <input type="password" name="password" onChange={handleChange} value={signUp.password}/>
            
            <button>Sign Up</button>
            </form>
            <div className="signUp">
            <Link to="/" style={{textDecoration: "none"}}>Existing user? Log in here</Link>
            </div>  
        </div>
        </div>
    );
    }

export default SignUpPage;
