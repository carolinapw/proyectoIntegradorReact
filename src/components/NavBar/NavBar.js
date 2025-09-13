import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar (props){
    return (
        <ul className="main-nav">
            {props.nav.map((item, idx) => 
                <li> <Link to={item.ruta} key={item+idx}> {item.seccion} </Link> </li>
            )}
        </ul>
    )
}

export default Navbar;