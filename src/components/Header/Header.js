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
    if(this.state.query!==""){
      this.props.history.push(`/search/${this.state.type}/${this.state.query}`);
    }
  }
  filtrarPeliculas(textoAFiltrar){
    let lista = this.state.seccion==="popular" ? this.state.peliculasPopulares : this.state.seccion==="now-playing" ? this.state.peliculasCartelera : [];
    let peliculasFiltradas = lista.filter(pelicula => pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase))
    this.setState({peliculasFiltradas});
  }
  filtrarSeries(textoAFiltrar){
    let listaSeries = this.state.seccion==="popular" ? this.state.seriesPopulares : this.state.seccion==="airing-today" ? this.state.seriesHoy : [];
    let seriesFiltradas = listaSeries.filter(serie => serie.name.toLowerCase().includes(textoAFiltrar.toLowerCase))
    this.setState({seriesFiltradas});
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
            placeholder={`Buscar ${this.state.type=== "movie" ? "peliculas" : this.state.type==="tv" ? "series" : "series y peliculas" }`}
            value={this.state.query}
            onChange={(e) => {
              this.setState({ query: e.target.value });

              if (this.state.type === "movie") {
                 this.filtrarPeliculas(e.target.value);
              } else if (this.state.type === "tv") {
                this.filtrarSeries(e.target.value);}
               
              }}
             
          />
          <button type="submit">Buscar</button>
        </form>
      </header>
    );
  }
}

export default withRouter(Header);
