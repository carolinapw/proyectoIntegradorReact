import React, { Component } from "react";
import ListScreen from "../ListScreen/ListScreen";

class SeriesAiringToday extends Component {
    render(){ 
        return <ListScreen type="tv" section="airing_today" title="Todas las series al aire hoy" />; 
    }
}
export default SeriesAiringToday