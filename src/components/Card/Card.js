import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const img = "https://image.tmdb.org/t/p/w342"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { verMas: false, textoBoton: "Ver descripción", esFavorito: false }
    }
    componentDidMount(){
        let key = this.props.type === "movie" ? "favoritosM" : "favoritosS";
        let favoritos = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
        let coincidencias = favoritos.filter(fav => fav.id === this.props.item.id);
        if (coincidencias.length > 0 ) {
             this.setState({esFavorito: true})
        } else{
             this.setState({esFavorito: false})
        }
       
    }
    toggleFavorito(){
    const { item, type } = this.props;
    let key = type === "movie" ? "favoritosM" : "favoritosS";

    let recupero = localStorage.getItem(key);
    let favoritos = recupero ? JSON.parse(recupero) : [];

    if (this.state.esFavorito) {
     
      favoritos = favoritos.filter((f) => f.id !== item.id);
    } else {
      
      favoritos.push(item);
    }

    localStorage.setItem(key, JSON.stringify(favoritos));
    this.setState({ esFavorito: !this.state.esFavorito});
};
    botonVerMas = () => {
        this.setState((p) => ({
            verMas: !p.verMas,
            textoBoton: p.textoBoton === "Ver descripción" ? "Ocultar descripción" : "Ver descripción",
        }));
    };

    render() {
        const { item, type } = this.props;
        //let id = item.id
        let titulo  = item.title || item.name || "Sin título"
        let poster = item.poster_path ? img + item.poster_path : ""
        let descripcion = item.overview || "Sin descripción disponible."
        let to = type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`

        const { verMas, textoBoton } = this.state;

        return (
            <article className="card">

                <div className="card-media">
                    {poster ? <img src={poster} alt={titulo} /> : <div className="no-img">Sin imagen</div>}
                </div>

                <div className="card-body">

                    <h4 className="card-title">
                        <Link to={to}>{titulo}</Link>
                    </h4>

                    <p className="more" onClick={this.botonVerMas}>{textoBoton}</p>

                    {verMas && (
                        <section className="extra">
                            <p>{descripcion}</p>
                        </section>
                    )}

                    <div className="card-actions">
                        <Link className="btn" to={to}>Ir a detalle</Link>
                           <button className="btn" onClick={() => this.toggleFavorito()}> 
                            {this.state.esFavorito ? "Eliminar de favoritos" : "Agregar a favoritos"}</button>
                    </div>
                </div>
                
            </article>
        )
    }
}

export default Card;