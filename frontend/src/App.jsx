import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
