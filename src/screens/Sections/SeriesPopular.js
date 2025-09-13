import React, { Component } from "react";
import ListScreen from "../ListScreen/ListScreen";

class SeriesPopular extends Component {
    render(){ 
        return <ListScreen {...this.props} type="tv" section="popular" title="Todas las series populares" />; 
    }
}
export default SeriesPopular