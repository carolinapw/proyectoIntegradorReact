import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./CardList.css";

class CardList extends Component {
    render() {

    return (
      <section className="group">
        <header className="group-header">
            <h3>{this.props.title}</h3>
            {this.props.seeAllTo ? (
              <Link className="seeAll" to={this.props.seeAllTo}>Ver todas</Link>
            ) : null}
        </header>

        <div className="grid">
          {/* Mapeo acá, no en Home */}
          {/* con item={p} le paso a Card el objeto completo que vino de TMDB en el .map */}
          {/* con `${type}-${p.id}` si type = "movie" e id = 603, la key queda "movie-603" */}
          {this.props.items.map(p => (
            <Card 
                key={`${this.props.type}-${p.id}`} 
                item={p} 
                type={this.props.type}
            /> 
          ))}
        </div>
      </section>
    );
  }
}

export default CardList


