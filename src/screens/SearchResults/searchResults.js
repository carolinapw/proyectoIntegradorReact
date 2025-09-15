import React, { Component } from "react";

const apiKey = "d7dce97c9f45ff25eeb66dc3784d0bca"
const base = "https://api.themoviedb.org/3"

class SearchResults extends Component{
     constructor(props) {
    super(props);
    this.state = {
      query: "", 
      type: "",
      data:null, 
      cargando:true,
      error: null, 
    };
  }
    
 componentDidMount() {
    let type = this.props.match.params.type
    let query = this.props.match.params.query
    let url = `${base}/search/${type}?api_key=${apiKey}&language=en&query=${encodeURIComponent(query)}`
    
        fetch(url)
            .then(r => r.json())
            .then(data => 
                this.setState({
                    query:query,
                    type: type,
                    data:data.results, 
                    cargando:false
                }))
            .catch(e => this.setState({ error: e.message, cargando: false }));
   
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
        <h1>Resultados de busqueda</h1>
         <section className="card-container">
          {this.state.data.map(item => {
             const titulo = this.state.type === "movie" ? item.title : item.name;
              const fecha = this.state.type === "movie" ? item.release_date : item.first_air_date;
              const poster = item.poster_path
              ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
              : "";

            return (
              <article className="card" key={item.id}>
                <img src={poster} alt={titulo} />
                <div className="card-body">
                  <h2>{titulo}</h2>
                  <p><strong>Calificación:</strong> {item.vote_average}</p>
                  <p><strong>Fecha de estreno:</strong> {fecha}</p>
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