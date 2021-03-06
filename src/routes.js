import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";

const Rota = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/map" element={<Map />} />
        </Routes>
        </BrowserRouter>
    )
}

export default Rota;
