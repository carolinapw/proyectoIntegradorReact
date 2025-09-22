import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../components/CardList/CardList.css";
import "./Favoritos.css";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculasFav: [],
      seriesFav: []
    };
  }

  componentDidMount() {
    const recuperoMovies = localStorage.getItem("favoritosM");
    const recuperoSeries = localStorage.getItem("favoritosS");

    let peliculasRecuperadas = [];
    let seriesRecuperadas = [];

    if (recuperoMovies) {
      peliculasRecuperadas = JSON.parse(recuperoMovies);
    }

    if (recuperoSeries) {
      seriesRecuperadas = JSON.parse(recuperoSeries);
    }

    this.setState({
      peliculasFav: peliculasRecuperadas,
      seriesFav: seriesRecuperadas
    });
  }
 eliminarFavorito(id, type) {
  let listaActual;
  let key;

  if (type === "movie") {
    listaActual = this.state.peliculasFav;
    key = "favoritosM";
  } else {
    listaActual = this.state.seriesFav;
    key = "favoritosS";
  }


  let nuevaLista = listaActual.filter(function(item) {
    return item.id !== id;
  });

  let listaString = JSON.stringify(nuevaLista);
  localStorage.setItem(key, listaString);

 
  if (type === "movie") {
    this.setState({ peliculasFav: nuevaLista });
  } else {
    this.setState({ seriesFav: nuevaLista });
  }
}


  render() {
    return (
      <main className="favorites-page">
        <h1 className="myFavorites">Mis Favoritos</h1>

        <section>
          <h2>Películas</h2>
          {this.state.peliculasFav.length === 0 ? (
            <p>No tienes películas favoritas</p>
          ) : (
            this.state.peliculasFav.map((peli) => (
              <article key={peli.id} className="favorite-card">
                <img
                  src={"https://image.tmdb.org/t/p/w200" + peli.poster_path}
                  alt={peli.title}
                />
                <h3>
                  <Link to={"/movie/" + peli.id}>{peli.title}</Link>
                </h3>
               <button onClick={() => this.eliminarFavorito(peli.id, "movie")}>
                 Eliminar
                </button>
              </article>
            ))
          )}
        </section>

        <section>
          <h2>Series</h2>
          {this.state.seriesFav.length === 0 ? (
            <p>No tienes series favoritas</p>
          ) : (
            this.state.seriesFav.map((serie) => (
              <article key={serie.id} className="favorite-card">
                <img
                  src={"https://image.tmdb.org/t/p/w200" + serie.poster_path}
                  alt={serie.name}
                />
                <h3>
                  <Link to={"/tv/" + serie.id}>{serie.name}</Link>
                </h3>
                <button onClick={() => this.eliminarFavorito(serie.id, "tv")}>
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

