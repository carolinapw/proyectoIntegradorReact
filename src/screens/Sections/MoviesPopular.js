import React, { Component } from "react";
import ListScreen from "../ListScreen/ListScreen";

class MoviesPopular extends Component {
    render(){ 
        return <ListScreen {...this.props} type="movie" section="popular" title="Todas las películas más populares" />; 
    }
}
export default MoviesPopular