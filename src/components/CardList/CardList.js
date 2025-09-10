import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./CardList.css";

class CardList extends Component {
    render() {
    let { title, items, type, seeAllTo } = this.props;

    return (
      <section className="group">
        <header className="group-header">
            <h3>{title}</h3>
            {seeAllTo && <Link className="seeAll" to={seeAllTo}>Ver todas</Link>}
        </header>

        <div className="grid">
          {/* Mapeo acá, no en Home */}
          {/* con item={p} le paso a Card el objeto completo que vino de TMDB en el .map */}
          {/* con `${type}-${p.id}` si type = "movie" e id = 603, la key queda "movie-603" */}
          {items.map(p => (
            <Card 
                key={`${type}-${p.id}`} 
                item={p} 
                type={type}
            /> 
          ))}
        </div>
      </section>
    );
  }
}

export default CardList


