import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Navbar from "../NavBar/NavBar";

function Header() {
    let itemsHeader = [
        {
        ruta: "/",
        seccion: 'Home'
        },
        {
        ruta: "/favorites", // Falta hacer 
        seccion: 'Favoritos' 
        },
        {
        ruta: "/movies/popular",
        seccion: 'Pelis populares'
        },
        {
        ruta: "/movies/now-playing",
        seccion: 'Pelis en cartelera'
        },
        {
        ruta: "/series/popular",
        seccion: 'Series populares'
        },
        {
        ruta: "/series/airing-today",
        seccion: 'Series hoy'
        }
    ]
    return (
      <header className="app-header">
        <div className="brand">
          <Link to="/">UdeSA Movies</Link>
        </div>

        <nav className="nav">
            <Navbar nav={itemsHeader} />
        </nav>

         {/* <Formulario /> Faltan hacer los resultados de busqueda */}
      </header>
    );
}

export default Header
    
