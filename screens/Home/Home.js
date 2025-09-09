import React, {Component} from 'react';
// import Header
// import Footer
// import Home.css

class Home extends Component {
    constructor (props){
        super(props)
        this.state ={
            peliculasPopulares: [],
            peliculasCartelera: [],
            seriesPopulares: [], 
            seriesHoy: []
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
        let { peliculasPopulares, peliculasCartelera, seriesPopulares, seriesHoy } = this.state;
        return (
            <>
            <section>
                <h2>Películas populares</h2>
                <article>
                    {
                        peliculasPopulares.map((p, idx) => (
                            <CardList>
                                key={p + idx}
                                id={p.id}
                                name={p.name}
                                img={p.img}
                            </CardList>
                            )
                        )
                    }
                </article>
            </section>

            </>
        )
    }
}
