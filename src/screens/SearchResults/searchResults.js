import React, { Component } from "react";

const apiKey = "d7dce97c9f45ff25eeb66dc3784d0bca"

class SearchResults extends Component{
     constructor(props) {
    super(props);
    this.state = {
      query: "", 
      type: "",
      data:null, 
      cargando:false,
      error: null, 
    };
  }
    
 componentDidMount() {
    let type = this.props.match.params.type
    let query = this.props.match.params.query
  
      if (type === "movie") {

     fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
        .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          this.setState({
            data: res.results,
            type: type,
            query: query,
            cargando: false
          });
        } else {
          this.setState({
            data: null, 
            type: type,
            query: query,
            cargando: false
          });
        }
      })
        .catch(err => console.error(err));
            }else {
                    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
        .then(res => res.json())
        .then(res => {
        if (res.results && res.results.length > 0) {
          this.setState({
            data: res.results,
            type: type,
            query: query,
            cargando: false
          });
        } else {
          this.setState({
            data: null, 
            type: type,
            query: query,
            cargando: false
          });
        }
      })
        .catch(err => console.error(err));
            }

    }
     
  render() {
    if (this.state.cargando) {
      return <p>Cargando resultados....</p>;
    }
    if (this.state.error){
        return <p>Error: {this.state.error}</p>
    }
    if(!this.state.data){
       return <p>No se encontraron resultados</p>
    }
    if(this.state.data.length===0){
        return <p>No se encontraron resultados</p>
    }

    return (
      <React.Fragment>
        <h1>Resultados de búsqueda</h1>
         <section className="card-container">
          {this.state.data.map((item) => { 
            return (
              <article className="card" key={item.id}>
                <img  src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : ""}  alt={this.state.type === "movie" ? item.title : item.name} />
                <div className="card-body">
                  <h2>{this.state.type === "movie" ? item.title : item.name}</h2>
                  <p><strong>Calificación:</strong> {item.vote_average}</p>
                  <p><strong>Fecha de estreno:</strong> {this.state.type === "movie" ? item.release_date : item.first_air_date}</p>
                  <p><strong>Sinopsis:</strong> {item.overview}</p>
                </div>
              </article>
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default SearchResults