import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";
import Navbar from "../NavBar/NavBar";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      itemsHeader: [
        { ruta: "/", seccion: 'Home' },
        { ruta: "/favorites", seccion: 'Favoritos' },
        { ruta: "/movies/popular", seccion: 'Pelis populares' },
        { ruta: "/movies/now-playing", seccion: 'Pelis en cartelera' },
        { ruta: "/series/popular", seccion: 'Series populares' },
        { ruta: "/series/airing-today", seccion: 'Series hoy' }
      ], 
      query: "",
      type: "", 
      seccion: "popular",
      peliculasPopulares: [],
      peliculasCartelera:[],
      seriesPopulares: [],
      seriesHoy: []
    };
    
  }
  componentDidUpdate(prevProps) {
  if (this.props.location.pathname !== prevProps.location.pathname) {
    if (this.props.location.pathname.includes("/series")) {
      this.setState({ type: "tv" });
    } else if (this.props.location.pathname.includes("/movies")) {
      this.setState({ type: "movie" });
    } else {
      this.setState({ type: "all"}); 
    }
  }
  
}
  handleSubmit(e){
    e.preventDefault();
    console.log(e);
    
    if(this.state.query!==""){
      this.props.history.push(`/search/${this.state.type}/${this.state.query}`);
    }
  }
  
  render() {
    console.log();
    
    return (
      <header className="app-header">
        <div className="brand">
          <Link to="/">UdeSA Movies</Link>
        </div>

        <nav className="nav">
          <Navbar nav={this.state.itemsHeader} />
        </nav>
      
        <form onSubmit={(event) => this.handleSubmit(event)} className="search-form">
          <input
            type="text"
            placeholder={`Buscar ${this.state.type=== "movie" ? "peliculas" : this.state.type==="tv" ? "series" : "series y peliculas" }`}
            value={this.state.query}
            onChange={(e) => {
              console.log(e.target);
              
              this.setState({ query: e.target.value });
               
              }}
             
          />

          <button type="submit">Buscar</button>
        </form>
      </header>
    );
  }
}

export default withRouter(Header);
