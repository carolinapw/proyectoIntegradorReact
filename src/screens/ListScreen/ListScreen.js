// Screen base para reutilizar
import React, { Component } from "react";
import Card from "../../components/Card/Card";
import "../../components/CardList/CardList.css";

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
            error: null };
    }

    componentDidMount() { 
        let { type, section } = this.props; // "movie" o "tv" y la sección
        let url = `${base}/${type}/${section}?api_key=${apiKey}&language=en-US&page=${this.state.page}`
    
        fetch(url)
            .then(r => r.json())
            .then(data => 
                this.setState({
                    items: data.results,
                    cargando: false,
                    page: 1
                }))
            .catch(e => this.setState({ error: e.message, cargando: false }));
    }

    handleLoadMore() {
        let { type, section } = this.props; // "movie" o "tv" y la sección}
        let next = this.state.page + 1;
        let url = `${base}/${type}/${section}?api_key=${apiKey}&language=en-US&page=${next}`

        fetch(url)
            .then(r => r.json())
            .then(data => 
                this.setState(p => ({
                    items: p.items.concat(data.results),
                    page: next,
                    cargando: false
            })))
            .catch(e => this.setState({ error: e.message, cargando: false }));

    }

    handleFilter(event) {
        this.setState({filter: event.target.value});
    }

    render() {

        if (this.state.cargando) {
      return <p>Cargando resultados....</p>;}
        const { type, title } = this.props
        const { items, filter, cargando, error } = this.state

        let filtered = items.filter(it => {
            const t = (type === "movie" ? it.title : it.name) || "";
            return t.toLowerCase().includes(filter.toLowerCase());
        });

        return (
            <div className="group">
                <header className="group-header">
                    <h3>{title}</h3>
                    <input
                        type="text"
                        placeholder="Filtrar…"
                        value={filter}
                        onChange={(event)=>this.handleFilter(event)}
                    />
                </header>

        {error && <p className="error">Error: {error}</p>}

        <div className="grid">
            {filtered.map(it => 
                <Card key={`${type}-${it.id}`} item={it} type={type} />
            )}
        </div>

        <div>
          <button className="btn" onClick={() => this.handleLoadMore()} disabled={cargando}>
            {cargando ? "Cargando..." : "Cargar más"}
          </button>
        </div>
      </div>
    );
  }

}

export default ListScreen