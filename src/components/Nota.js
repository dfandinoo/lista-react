import React, { Component } from 'react';

class Nota extends Component {
  /*Se crear el component Nota el cual imprimer un texto el cual se le envia por referencia*/
  render() {
    return (

      <div className="note" onClick={this.props.eliminar}>
        {this.props.texto}
      </div>
    );
  }
}

export default Nota;
