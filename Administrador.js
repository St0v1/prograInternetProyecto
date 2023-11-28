import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default class Administrador extends Component {
  constructor(props) {
    super(props);
    this.state = {
        numeroPreguntas: 0,
        preguntaActual: 0,
        posicion: 0,
        preguntas: [],
        pregunta: "",
    };

    this.obtenerPreguntas();
    this.siguientePregunta = this.siguientePregunta.bind(this);
    this.reiniciar = this.reiniciar.bind(this);
  }

  obtenerPreguntas() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log("se obtuvieron preguntas de bd");
        var resp = xhttp.responseText;
        const preguntasSplit = resp.split('_');
        this.setState({
          preguntas: preguntasSplit,
          pregunta: preguntasSplit.length > 0 ? preguntasSplit[0] : null, 
        });
      }
      else {
        console.log("error, no se encontro la bd")
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/datosPreguntas.php", true);
    xhttp.send();
  }

  activarPregunta(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log("se obtuvieron preguntas de bd");
        var resp = xhttp.responseText;
        const preguntasSplit = resp.split('_');
        this.setState({
          preguntas: preguntasSplit,
          pregunta: preguntasSplit.length > 0 ? preguntasSplit[0] : null, 
        });
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/datosPreguntas.php", true);
    xhttp.send();
  
  }

  siguientePregunta() {
    const { preguntas, posicion } = this.state;
    const nuevaPosicion = posicion + 1;
    console.log(nuevaPosicion)
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        if (nuevaPosicion < preguntas.length - 1) {
          this.setState({
            posicion: nuevaPosicion,
            pregunta: preguntas[nuevaPosicion],
          });
        } else {
          this.setState({
            pregunta: "Fin del cuestionario",
          });
        }
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/actualizarStatus.php?id=" + nuevaPosicion, true);
    xhttp.send();
  }

  reiniciar(){
    const { preguntas} = this.state;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.setState({
          posicion: 0,
          pregunta: preguntas[0],
        });
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/reiniciarStatus.php", true);
    xhttp.send();
  }

  render() {

    const { pregunta, txtSeleccionada } = this.state;

    return (
        <View style={styles.container}>
          <Text style={styles.pregunta}>Administrador</Text>
          <Text style={styles.pregunta}>{pregunta}</Text>
          <Text style={styles.label}>Presiona cuando hayan contestado todos</Text>
          <Button title="Activar Pregunta" onPress={this.siguientePregunta} />
          <Button title="Reiniciar Cuestionario" onPress={this.reiniciar} />
          <Text style={styles.pregunta}>{txtSeleccionada}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    pregunta: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
  });
