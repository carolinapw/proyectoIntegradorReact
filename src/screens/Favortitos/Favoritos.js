import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import "../../components/CardList/CardList.css";
import "./Favoritos.css"

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculasFav: [],
      seriesFav: []
    };
  }

  componentDidMount() {
    this.cargarFavoritos();
  }

  cargarFavoritos(){
    const recuperoMovies = localStorage.getItem("favoritosM");
    const recuperoSeries = localStorage.getItem("favoritosS");

    const peliculasRecuperadas = recuperoMovies ? JSON.parse(recuperoMovies) : [];
    const seriesRecuperadas = recuperoSeries ? JSON.parse(recuperoSeries) : [];

    this.setState({
      peliculasFav: peliculasRecuperadas,
      seriesFav: seriesRecuperadas
    });
  };

  eliminarFavoritos(id, type){
    const key = type === "movie" ? "favoritosM" : "favoritosS";
    const recupero = localStorage.getItem(key);
    let lista = recupero ? JSON.parse(recupero) : [];

    lista = lista.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(lista));

   
    this.cargarFavoritos();
  };

  render() {
    const { peliculasFav, seriesFav } = this.state;

    return (
      <main className="favorites-page">
        <h1>Mis Favoritos</h1>

        <section>
          <h2>Películas</h2>
          {peliculasFav.length === 0 ? (
            <p>No tienes películas favoritas</p>
          ) : (
            peliculasFav.map((peli) => (
              <article key={peli.id} className="favorite-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${peli.poster_path}`} 
                  alt={peli.title}
                />
                <h3>
                  <Link to={`/movie/${peli.id}`}>{peli.title}</Link>
                </h3>
                <button onClick={() => this.eliminarFavoritos(peli.id, "movie")}>
                  Eliminar
                </button>
              </article>
            ))
          )}
        </section>

        <section>
          <h2>Series</h2>
          {seriesFav.length === 0 ? (
            <p>No tienes series favoritas</p>
          ) : (
            seriesFav.map((serie) => (
              <article key={serie.id} className="favorite-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`}
                  alt={serie.name}
                />
                <h3>
                  <Link to={`/tv/${serie.id}`}>{serie.name}</Link>
                </h3>
                <button onClick={() => this.eliminarFavoritos(serie.id, "tv")}>
                  Eliminar
                </button>
              </article>
            ))
          )}
        </section>
      </main>
    );
  }
}

export default Favoritos;