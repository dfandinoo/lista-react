import React, { Component } from 'react';
import Nota from "./components/Nota";
import './App.css';

class App extends Component {

  //constructor de react
  constructor(props) {
    super(props);
    //props hace referencia a las properties
    //cada propertie en react tiene un estado
    this.state = {
      notaTexto: '',
      notas: JSON.parse(localStorage.getItem('notas')) || [],
    }
  }

  //metodo actualizar notaTexto que sera donde se encuentra lo que se escriba en el input
  actualizarNotaTexto(notaTexto) {
    //se actualiza el estado de esa variable
    this.setState({
      notaTexto: notaTexto.target.value
    })
  }

  //funcion para agregar la nota
  agregarNota() {
    //se valida si esta vacia la varialbe por su estado
    if (this.state.notaTexto == "" ) {
      return;
    }else {
      // se verifica que existe o no en el localstorage
      if(localStorage.getItem('notas') == null) {
        //si no existe se empieza a llenar
        var notasArray = [];
        notasArray.push(this.state.notaTexto);
        //con este metodo se establece el valor en localstorage y con JSON.stringify se convierte en un array
        localStorage.setItem('notas', JSON.stringify(notasArray));
      } else {
        //si existe se trae todo lo que este guardado en local storage y se le asigna a la variable notasArray
        var notasArray = JSON.parse(localStorage.getItem('notas'))
        notasArray.push(this.state.notaTexto);
        // se actualizan los valores del localstorage
        localStorage.setItem('notas', JSON.stringify(notasArray));
      }
      //se actualiza el estado de la variable con cualquier cosa que este en el localstorage
      this.setState({ notas: JSON.parse(localStorage.getItem('notas')) });
      // se actualiza el estado de la variable borrandole todo
      this.setState({ notaTexto: '' });
      // se pone el focus en el campo de texto
      this.textInput.focus();
    }
  }

  // funcion para eliminar la nota
  eliminarNota(index) {
    // se traen todos los valores de la variable notas
    var notasArray = this.state.notas;
    // con la funcion splice se borra un valor de acuerdo a su posicion, y la cantidad de valores a borrar en este caso solo 1
    notasArray.splice(index, 1);
    // se actualiza la lista del localstorage ya con el valor eliiminado
    localStorage.setItem('notas', JSON.stringify(notasArray));
    // se actualiza el estado de la variable notas con el valor borrado
    this.setState({ notas: notasArray })
  }


  render() {

    {/*se renderiza el component nota.js - con la funcion map se recorre el array y retorna una llave - valor*/}
    let notas = this.state.notas.map((val, key) => {
      // se le asigna la key y el valor a el component nota y se le pone la funcion eliminar
      return <Nota key={key} texto={val} eliminar={ () => this.eliminarNota(key) } />
    })

    return (
      <div className="container">

        <div className="header"> Aplicacion lista con react </div>

        {/*se renderiza y se trae todo lo que se hizo en la variable de arriba notas*/}
        {notas}


        {/*se genera el input donde se pone lo que se va escribir ref hace referencia al input,
        es decir a todo lo que pase en el input en el contexto de este componente
        value es el valor que tendra cada vez que se llene el textInput
        onchange cada vez que cambie el input se actualizara la variable notaTexto*/}
        <div className="btn" onClick={this.agregarNota.bind(this)}>+</div>

        <input type="text"
          ref={((input) => {this.textInput = input})}
          className="textInput"
          value={this.state.notaTexto}
          onChange={notaTexto => this.actualizarNotaTexto(notaTexto)}
          />

      </div>
    );
  }
}

export default App;
