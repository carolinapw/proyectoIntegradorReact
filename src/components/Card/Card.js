import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const img = "https://image.tmdb.org/t/p/w342"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { verMas: false, textoBoton: "Ver descripción" }
    }
    
    botonVerMas = () => {
        this.setState((p) => ({
            verMas: !p.verMas,
            textoBoton: p.textoBoton === "Ver descripción" ? "Ocultar descripción" : "Ver descripción",
        }));
    };

    render() {
        const { item, type } = this.props;
        //let id = item.id;
        let titulo  = item.title || item.name || "Sin título";
        let poster = item.poster_path ? img + item.poster_path : "";
        let descripcion = item.overview || "Sin descripción disponible.";
        let to = type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;

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

                    {/* botón ver/ocultar descripción */}
                    <p className="more" onClick={this.botonVerMas}>{textoBoton}</p>

                    {/* descripción: arranca oculta */}
                    {verMas && (
                        <section className="extra">
                            <p>{descripcion}</p>
                        </section>
                    )}

                    {/* Ir a detalle */}
                    <div className="card-actions">
                        <Link className="btn" to={to}>Ir a detalle</Link>
                    </div>
                </div>
            </article>
        )
    }
}

export default Card