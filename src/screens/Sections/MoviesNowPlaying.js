import React, { Component } from "react";
import ListScreen from "../ListScreen/ListScreen";

class MoviesNowPlaying extends Component {
    render(){ 
        return <ListScreen type="movie" section="now_playing" title="Todas las películas en cartelera" />; 
    }
}
export default MoviesNowPlaying