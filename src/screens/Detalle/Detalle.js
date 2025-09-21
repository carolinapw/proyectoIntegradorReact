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
    const id = this.props.match.params.id;
    let type = this.props.match.params.type

    if (type === "series") { type = "tv";}

    let url = `${base}/${type}/${id}?api_key=${apiKey}&language=en`
    
        fetch(url)
            .then(r => r.json())
            .then(data => 
                this.setState({
                    data: data,
                    cargando:false, 
                    type:type
                }))
            .catch(e => this.setState({ error: e.message, cargando: false }));
            }
  render() {
   
    if (!this.state.data) {
      return <p className="detail-loading">Cargando detalle....</p>;
    }
 
    return (
      <React.Fragment>
        <h1 className='detail'>Detalle de {this.state.type==="movie" ? "Pelicula" : "Serie"}</h1>
        <section className="card-container">
         <article className="card">
             <div>
               <img className="poster" src={`https://image.tmdb.org/t/p/w500${this.state.data.poster_path}`} alt={this.state.type === "movie" ? this.state.data.title : this.state.data.name}/>
        <h2>{this.state.type === "movie" ? this.state.data.title : this.state.data.name}</h2>
        <p><strong>Fecha de estreno:</strong>{this.state.type === "movie" ? this.state.data.release_date : this.state.data.first_air_date}</p>
        {this.state.type === "movie" ? <p className="label"><strong>Duración:</strong>{this.state.data.runtime} min</p> : null}
        <p><strong>Calificación:</strong> {this.state.data.vote_average}</p>
       <p className="label"><strong>Genero(s):</strong>{this.state.data.genres ? this.state.data.genres.map((g, idx) => (
        <span key={idx}> {g.name}</span>)): "No disponible"}</p>
        <p><strong>Sinopsis:</strong> {this.state.data.overview}</p>
      </div>
         </article>
        </section>
      </React.Fragment>
    );
  }
}

export default Detalle;