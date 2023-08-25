import { Routes, Route, Link, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";
import Reporter from "./components/Reporter";
import Admin from "./components/Admin";

import './App.css';


function App() {
  return (
    <>
        <header className="App-header">
          <p className="header-text"><Link to="/login">News A-Z</Link></p>
        </header>
  
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/login" element={<Login />} /> 
          <Route path="/login" element={<Navigate to  ="/login"/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/redirect" element={<Navigate to="/signup" />} />
          <Route path="/login/user" element={<User />} />
          <Route path="/login/reporter" element={<Reporter />} />
          <Route path="/login/admin" element={<Admin />} />
          
        </Route>

        <Route path="*" element={<p>404 Page Not Found!</p>} />
      </Routes>

    </>
  );
}

export default App;
