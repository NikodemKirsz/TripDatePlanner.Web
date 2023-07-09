import React from 'react';
import './styles/App.css';
import './styles/Global.css';
import "./styles/Pages.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TripPage from "./pages/TripPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/trip/:id" Component={TripPage}/>
        <Route path="/newtrip" Component={HomePage}/>
        <Route path="/about" Component={HomePage}/>
        <Route path=":route" Component={NotFoundPage}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
