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
      peliculasCartelera:[]
    };
    
  }
  componentDidUpdate(prevProps) {
  if (this.props.location.pathname !== prevProps.location.pathname) {
    let path = this.props.location.pathname;
    if (path.includes("/series")) {
      this.setState({ type: "series" });
    } else if (path.includes("/movies")) {
      this.setState({ type: "movie" });
    } else {
      this.setState({ type: "" }); 
    }
  }
  
}
  handleSubmit(e){
    e.preventDefault();
    if(this.state.query!==""){
      this.props.history.push(`/search/${this.state.type}/${this.state.query}`);
    }
  }
  filtrarPeliculas(textoAFiltrar){
    let lista = this.state.seccion==="popular" ? this.state.peliculasPopulares : this.state.seccion==="now-playing" ? this.state.peliculasCartelera: [];
    let peliculasFiltradas = lista.filter(pelicula => pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase))
    this.setState({peliculasFiltradas});
  }
  
  render() {
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
            placeholder={`Buscar ${this.state.type=== "movie" ? "peliculas" : this.state.type==="series" ? "series" : "series y peliculas" }`}
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>
    );
  }
}

export default withRouter(Header);
