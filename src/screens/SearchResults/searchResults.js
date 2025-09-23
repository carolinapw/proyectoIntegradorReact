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

    this.setState({ cargando: true })
  
    if (type === "movie") {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            data: (data.results || []),
            type: type,
            query: query,
            cargando: false
          });
        }
        ) 
        .catch(err => {
          console.log(err);
          this.setState({ cargando: false, data: [] });
        });
    } else {
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            data: (data.results || []),
            type: type,
            query: query,
            cargando: false
          });
        }
        )
        .catch(err => {
          console.log(err);
          this.setState({ cargando: false, data: [] });
        });
    }
  }
     
  render() {
    if (this.state.cargando) {
      return <p>Cargando resultados....</p>;
    }
    if(!this.state.data){
       return <p>No se encontraron resultados</p>
    }
    if (this.state.data.length === 0) {
      return <p>No se encontraron resultados.</p>;
    }

    return (
      <>
        <h1>Resultados de búsqueda</h1>
         <section className="results-card-container">
          {this.state.data.map((item) => { 
            return (
              <Card key={`${this.state.type}-${item.id}`} item={item} type={this.state.type}/>
            );
          })}
        </section>
     </>
    );
  }
}

export default SearchResults