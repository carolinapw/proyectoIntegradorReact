import React, { Component } from "react";
//import "../../components/CardList/CardList.css";
import "./Detalle.css";

const apiKey = "d7dce97c9f45ff25eeb66dc3784d0bca"
const base = "https://api.themoviedb.org/3"

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, 
      type: "",
      cargando: false
    };
  }
  componentDidMount() {
    const id = Number(this.props.match.params.id);

    let type = this.props.match.path.includes("/movie/") ? "movie" : "tv";

    let url = `${base}/${type}/${id}?api_key=${apiKey}&language=en`
    
        fetch(url)
            .then(r => r.json())
            .then(data => 
                this.setState({
                    data: data,
                    type: type
                }))
            .catch(e => this.setState({ error: e.message, cargando: false }));

   
            }
  render() {
   
    if (!this.state.data) {
      return <p className="detail-loading">Cargando detalle....</p>;
    }

    const titulo = this.state.type === "movie" ? this.state.data.title : this.state.data.name;
    const fecha = this.state.type === "movie" ? this.state.data.release_date : this.state.data.first_air_date;
    const duracion = this.state.type === "movie" ? `${this.state.data.runtime} min` : null;
    const rating = this.state.data.vote_average;
    const generos = this.state.data.genres.map((g) => g.name)
    const poster = this.state.data.poster_path
      ? `https://image.tmdb.org/t/p/w342${this.state.data.poster_path}`
      : "";
 
    return (
      <React.Fragment>
        <h1 className='detail'>Detalle de {this.state.type==="movie" ? "Pelicula" : "Serie"}</h1>
        <section className="card-container">
         <article className="card">
            <img src={poster} alt={titulo} /> 
            <div className="card-body">
              <h2>{titulo}</h2>
              <p><strong>Calificación:</strong> {rating}</p>
              <p><strong>Fecha de estreno:</strong> {fecha}</p>
              {duracion && <p><strong>Duración:</strong> {duracion}</p>}
              <p><strong>Géneros:</strong> {generos}</p>
              <p><strong>Sinopsis:</strong> {this.state.data.overview}</p>
            </div>
         </article>
        </section>
      </React.Fragment>
    );
  }
}

export default Detalle;