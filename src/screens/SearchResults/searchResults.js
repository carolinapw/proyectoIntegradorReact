import React, { Component } from "react";
import Card from "../../components/Card/Card";
import "./searchResults.css";

const apiKey = "d7dce97c9f45ff25eeb66dc3784d0bca"

class SearchResults extends Component{
    constructor(props) {
      super(props);
      this.state = {
        query: "", 
        type: "",
        data:null, 
        cargando:false,
    };
  }
    
 componentDidMount() {
    let type = this.props.match.params.type
    let query = this.props.match.params.query
  
    if (type === "movie") {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.results,
            type: type,
            query: query,
            cargando: false
          });
        }
        ) 
        .catch(err => console.log(err));
            }else {
                    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.results,
            type: type,
            query: query,
            cargando: false
          });
        }
        )
        .catch(err => console.log(err));
            }

    }
     
  render() {
    if (this.state.cargando) {
      return <p>Cargando resultados....</p>;
    }
    if(!this.state.data){
       return <p>No se encontraron resultados</p>
    }

    return (
      <section className="results-page">
        <h1 className="results-title">Resultados de búsqueda</h1>
         <section className="card-container">
          {this.state.data.map((item) => { 
            return (
              <Card item={item} type={this.state.type}/>
            );
          })}
        </section>
      </section>
    );
  }
}

export default SearchResults