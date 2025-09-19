import React, { Component, Link } from "react";
import "../../components/CardList/CardList.css";



class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, 
      type: "",
      cargando: false,
      favoritos: false,
      botonFav: "Agregar a Favoritos",
      peliculasFav: [],
    seriesFav:[]
    };
  }
  agregarFavoritos(){
    let recuperoMovies = localStorage.getItem("favoritosM");
    let recuperoSeries = localStorage.getItem("favoritosS");
   
    let peliculasRecuperadas = recuperoMovies ? JSON.parse(recuperoMovies) : [];
    let seriesRecuperadas = recuperoSeries ? JSON.parse(recuperoSeries) : [];

    peliculasRecuperadas.push(this.props.item)
    seriesRecuperadas.push(this.props.item)

    localStorage.setItem("favoritosM", JSON.stringify(peliculasRecuperadas));
    localStorage.setItem("favoritosS", JSON.stringify(seriesRecuperadas));

    this.setState({favoritos: true, botonFav: "Elinar de favoritos"});

}

eliminarFavoritos(){
    let recuperoMovies = localStorage.getItem("favoritosM");
    let recuperoSeries = localStorage.getItem("favoritosS");
   
    let peliculasRecuperadas = recuperoMovies ? JSON.parse(recuperoMovies) : [];
    let seriesRecuperadas = recuperoSeries ? JSON.parse(recuperoSeries) : [];

    peliculasRecuperadas = peliculasRecuperadas.filter(item => item.id !== this.props.item.id)
    seriesRecuperadas = seriesRecuperadas.filter(item => item.id !== this.props.item.id)

    localStorage.setItem("favoritosM", JSON.stringify(peliculasRecuperadas));
    localStorage.setItem("favoritosS", JSON.stringify(seriesRecuperadas));

    this.setState({favoritos: true, botonFav: "Elinar de favoritos"});

    
    }

  render() {
    const { data, peliculasFav, seriesFav } = this.state;

    if (!data) {
      return <p>Cargando detalle....</p>;
    }

    return (
      <main className="favorites-page">
        <h1>Mis Favoritos</h1>

        <section>
          <h2>🎬 Películas</h2>
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
                <button onClick={() => this.eliminarFavoritos(peli.id)}>
                  Eliminar
                </button>
              </article>
            ))
          )}
        </section>

        <section>
          <h2>📺 Series</h2>
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
                <button onClick={() => this.eliminarFavoritos(serie.id)}>
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