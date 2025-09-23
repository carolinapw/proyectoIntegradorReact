import React, { Component } from "react";
import Card from "../../components/Card/Card";
import "../../components/CardList/CardList.css";
import "./ListScreen.css";

const apiKey = "d7dce97c9f45ff25eeb66dc3784d0bca"
const base = "https://api.themoviedb.org/3"

class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [], 
            page: 1, 
            filter: "", 
            cargando: false, 

        }
    }

    componentDidMount() { 
        let url = `${base}/${this.props.type}/${this.props.section}?api_key=${apiKey}&language=en-US&page=${this.state.page}`
    
        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                this.setState({
                    items: data.results,
                    cargando: false,
                    page: 1
                })
            })
            .catch( error => console.log(error))
    }

    handleLoadMore() {
        let next = this.state.page + 1;
        let url = `${base}/${this.props.type}/${this.props.section}?api_key=${apiKey}&language=en-US&page=${next}`

        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                this.setState((p) => ({
                    items: p.items.concat(data.results),
                    page: next,
                    cargando: false
                }))
            })
            .catch(err => console.log(err));
    }

    handleFilter(event) {
        this.setState({filter: event.target.value});
    }

    render() {
        if (this.state.cargando) {
            return <p>Cargando resultados....</p>;}

        let filtered = this.state.items.filter((it) => {
            let t = this.props.type === "movie" ? (it.title ? it.title : "") : (it.name ? it.name : "");
            return t.toLowerCase().includes(this.state.filter.toLowerCase());
        });

        return (
            <section className="list-screen">
                <div className="group">

                    <header className="group-header">
                        <h3>{this.props.title}</h3>
                        <input
                            type="text"
                            placeholder="Filtrar…"
                            value={this.state.filter}
                            onChange={(event)=>this.handleFilter(event)}
                        />
                    </header>

                    <div className="grid">
                        {filtered.map(it => 
                        <Card key={`${this.props.type}-${it.id}`} item={it} type={this.props.type} />
                        )}
                    </div>

                    <div className="load-more">
                        <button className="btn" onClick={() => this.handleLoadMore()} disabled={this.state.cargando}>
                        {this.state.cargando ? "Cargando..." : "Cargar más"}
                        </button>
                    </div>

                </div>
      </section>
    )
  }
}

export default ListScreen