import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Login from "./components/Login";
import Register from "./components/Register";
const App = () => {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};
export default App;
