import React, { Component } from "react";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: null,
      error: null
    };
  }

  componentDidMount() {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=dUmJT2zyYG8PKqQigVY1Or7djx2f5Qtt&tag=&rating=g`)
      .then(response => response.json())
      .then(data => {
        this.setState({ gif: data.data.images.original.url });
      })
       .catch(err => this.setState({ error: err.message }));
  }

 render() {
  let texto = "Cargando…";
  if (this.props.text !== undefined) {
    texto = this.props.text;
  }

  if (this.state.error === true) {
    return <p>{texto}</p>;
  }

  if (this.state.gif === null) {
    return <p>{texto}</p>;
  }

  return (
    <div>
      <img src={this.state.gif} alt="Cargando..." />
      <p>{texto}</p>
    </div>
  );
}}

export default Loader;