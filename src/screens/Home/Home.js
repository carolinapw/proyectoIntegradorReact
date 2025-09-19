import React, {Component} from 'react';
import CardList from '../../components/CardList/CardList.js'
// import Loader from "../../components/Loader"
// import Header

class Home extends Component {
    constructor (props){
        super(props)
        this.state ={ 
            peliculasPopulares: [],
            peliculasCartelera: [],
            seriesPopulares: [], 
            seriesHoy: [], 
            cargando: false,
            error: null,
        }
    }

    componentDidMount (){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=d7dce97c9f45ff25eeb66dc3784d0bca&language=en-US&page=1')
            .then(response => response.json())
            .then(data => {
                this.setState({ peliculasPopulares: data.results }) 
            })                   
            .catch( error => console.log(error))

        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=d7dce97c9f45ff25eeb66dc3784d0bca&language=en-US&page=1')
            .then(response => response.json())
            .then(data => {
                this.setState({ peliculasCartelera: data.results }) 
            })                   
            .catch( error => console.log(error))

        fetch('https://api.themoviedb.org/3/tv/popular?api_key=d7dce97c9f45ff25eeb66dc3784d0bca&language=en-US&page=1')
            .then(response => response.json())
            .then(data => {
                this.setState({ seriesPopulares: data.results }) 
            })                   
            .catch( error => console.log(error))
        
        fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=d7dce97c9f45ff25eeb66dc3784d0bca&language=en-US&page=1')
            .then(response => response.json())
            .then(data => {
                this.setState({ seriesHoy: data.results }) 
            })                   
            .catch( error => console.log(error))
    }

    render() {
        
        if (this.state.error) return <p className="error">Error: {this.state.error}</p>;
           if (this.state.cargando) { return <p>Cargando resultados....</p>;}

        return (
            <>
            <CardList
                title="Películas más populares"
                items={this.state.peliculasPopulares.slice(0, 5)} 
                type="movie"
                seeAllTo="/movies/popular"
            />
            <CardList
                title="Películas en cartelera"
                items={this.state.peliculasCartelera.slice(0, 5)}
                type="movie"
                seeAllTo="/movies/now-playing"
            />
            <CardList
                title="Series populares"
                items={this.state.seriesPopulares.slice(0, 5)}
                type="tv"
                seeAllTo="/series/popular"
            />
            <CardList
                title="Series al aire hoy"
                items={this.state.seriesHoy.slice(0, 5)}
                type="tv"
                seeAllTo="/series/airing-today"
            />
            </>
        )
    }
}
export default Home
