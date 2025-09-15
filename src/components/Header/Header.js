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
            placeholder={`Buscar ${this.state.type=== "movie" ? "peliculas" : "series"  }`}
            value={this.state.query}
            onChange={(e) => {
              console.log(e.target);
              
              this.setState({ query: e.target.value });
               
              }}
             
          />
            <input onChange={(e) => {
               this.setState({ type: e.target.value });
            }} type="radio" name="media" value="movie"/>
            <label for="media">Movie</label>
            <input onChange={(e) => {
               this.setState({ type: e.target.value });
            }} type="radio" name="media" value="tv"/>
            <label for="media">Serie</label>
          <button type="submit">Buscar</button>
        </form>
      </header>
    );
  }
}

export default withRouter(Header);
