import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

class Votacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    preguntas: [],
    respuestas: [],
    posicion: 0,
    pregunta: "",
    selectedValue: "",  // Agrega esta línea
  };

  this.obtenerPreguntas();
  this.siguientePregunta = this.siguientePregunta.bind(this);
  this.guardarResultado = this.guardarResultado.bind(this);
  }
  

  obtenerPreguntas() {
    console.log("press");
    var xhttp = new XMLHttpRequest();
    var conexion = false;
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var resp = xhttp.responseText;
        const preguntasSplit = resp.split('_');
        this.setState({
          preguntas: preguntasSplit,
          pregunta: preguntasSplit.length > 0 ? preguntasSplit[0] : null,
          selectedKey: null,  // Reinicia el Picker al cambiar la pregunta
          selectedValue: "",  // Reinicia el valor seleccionado
        });
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/datosPreguntas.php", true);
    xhttp.send();
  }

  siguientePregunta() {
    const { preguntas, posicion, selectedValue } = this.state;
    const nuevaPosicion = posicion + 1;

    // Guarda el valor seleccionado antes de cambiar la pregunta
    this.guardarResultado(selectedValue);

    if (nuevaPosicion < preguntas.length - 1) {
      this.setState({
        posicion: nuevaPosicion,
        pregunta: preguntas[nuevaPosicion],
        selectedKey: null,  // Reinicia el Picker al cambiar la pregunta
        selectedValue: "",  // Reinicia el valor seleccionado
      });
    } else {
      this.setState({
        pregunta: "Fin del cuestionario",
        selectedKey: null,  // Reinicia el Picker al llegar al final
        selectedValue: "",  // Reinicia el valor seleccionado
      });
    }
  }

  guardarResultado(value) {
    this.setState((prevState) => ({
      respuestas: [...prevState.respuestas, value],
    }), () => {
      console.log("Respuestas:", this.state.respuestas);
    });
  }

  render() {
    const { pregunta, selectedKey } = this.state;

    return (
      <View>
        <Text>{pregunta}</Text>
        <Text>Selecciona una opción:</Text>
        <RNPickerSelect
          key={selectedKey}  // Asigna una clave para forzar el reinicio
          onValueChange={(value) => this.setState({ selectedValue: value })}
          items={[
            { label: "Opción 1", value: "respuesta1" },
            { label: "Opción 2", value: "respuesta2" },
            { label: "Opción 3", value: "respuesta3" },
            // Agrega más opciones según sea necesario
          ]}
        />

        <Button title="Siguiente Pregunta" onPress={() => this.siguientePregunta()} />
        <Button title="Reiniciar Picker" onPress={() => this.setState({ selectedKey: null, selectedValue: "" })} />
      </View>
    );
  }
}

export default Votacion;