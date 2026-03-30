// App.jsx
import {Routes, Route } from "react-router-dom";


import "./index.css";
import CurrentWeather from "./components/CurrentWeather";
import Historical from "./components/Historical";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    
    <>
     <Navbar/>
     <Toaster position="top-center" reverseOrder={false} />
      <Routes>
         
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/historical" element={<Historical />} />
      </Routes>
      <Footer/>
      </>
     
    
  );
}

export default App;