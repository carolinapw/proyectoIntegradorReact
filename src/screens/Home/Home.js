import React, {Component} from 'react';
import CardList from '../../components/CardList/CardList.js'
import Footer from '../../components/Footer/Footer.js';
// import Loader from "../../components/Loader"
// import Header

class Home extends Component {
    constructor (props){
        super(props)
        this.state ={ // Guarda los rdos del fetch en el estado
            peliculasPopulares: [],
            peliculasCartelera: [],
            seriesPopulares: [], 
            seriesHoy: [], 
            cargando: true,
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
        //if (this.state.cargando) return <Loader />; // o un <p>Cargando…</p>
        if (this.state.error) return <p className="error">Error: {this.state.error}</p>;

        return (
            <>
            <CardList
                title="Películas más populares"
                items={this.state.peliculasPopulares} // array de resultados que devuelve TMDB en cada fetch
                type="movie"
                seeAllTo="/movies/popular"
            />
            <CardList
                title="Películas en cartelera"
                items={this.state.peliculasCartelera}
                type="movie"
                seeAllTo="/movies/now-playing"
            />
            <CardList
                title="Series populares"
                items={this.state.seriesPopulares}
                type="tv"
                seeAllTo="/series/popular"
            />
            <CardList
                title="Series al aire hoy"
                items={this.state.seriesHoy}
                type="tv"
                seeAllTo="/series/airing-today"
            />
            <Footer />
            </>
        )
    }
}
export default Home
