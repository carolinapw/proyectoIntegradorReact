import React, { Component } from "react";

import "./Favoritos.css";
import Card from "../../components/Card/Card";
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
            <article className="favorite-card">
          {this.state.peliculasFav.map((item) => { 
            return (
              <Card item={item} type="movie"/>
            );
          })}
        </article>
          )}
        </section>

        <section>
          <h2>Series</h2>
          {this.state.seriesFav.length === 0 ? (
            <p>No tienes series favoritas</p>
          ) : (
           <article className="favorite-card">
          {this.state.seriesFav.map((item) => { 
            return (
              <Card item={item} type="movie"/>
            );
          })}
        </article>
          )}
        </section>
      </main>
    );
  }
}

export default Favoritos;

