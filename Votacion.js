import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

class Votacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntas: [],
      respuestas: [],
      posicion: 0,
      pregunta: "",
      selectedValue: "",  
      selectedKey: null,
      preguntaNoContestada: true,
      respuestaNoSeleccionada: true,
      txtSeleccionada: "No  contestada",
    };

    this.obtenerPreguntas();
    this.siguientePregunta = this.siguientePregunta.bind(this);
    this.guardarResultado = this.guardarResultado.bind(this)
    this.ContestarPregunta = this.ContestarPregunta.bind(this);;
  }

  componentDidMount() {
    this.obtenerPreguntas();
  }

  obtenerPreguntas() {
    var xhttp = new XMLHttpRequest();
    var conexion = false;
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log("se obtuvieron preguntas de bd");
        var resp = xhttp.responseText;
        const preguntasSplit = resp.split('_');
        this.setState({
          preguntas: preguntasSplit,
          pregunta: preguntasSplit.length > 0 ? preguntasSplit[0] : null,
          selectedKey: null,   
        });
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/datosPreguntas.php", true);
    xhttp.send();
  }

  siguientePregunta() {
    const { preguntas, posicion, selectedValue, preguntaNoContestada } = this.state;
    const nuevaPosicion = posicion + 1;
  
    
    //this.guardarResultado(selectedValue);
    if(preguntaNoContestada == true){
      return;
    } 

    // Consulta si se contesto la pregunta
    const status = "completa"
    
    if(status != "completa"){
      return
    }
    
    if (nuevaPosicion < preguntas.length - 1) {
      this.setState({
        posicion: nuevaPosicion,
        pregunta: preguntas[nuevaPosicion],
        selectedValue: "",
        preguntaNoContestada: true,
        txtSeleccionada: "No contestada",
        selectedKey: null
      });
    } else {
      this.setState({
        pregunta: "Fin del cuestionario",
        selectedKey: null, 
        preguntaNoContestada: true,
        txtSeleccionada: "Espere Instrucciones"
      });
    }
  }

  ContestarPregunta() {
    const { preguntas, selectedValue, preguntaNoContestada } = this.state;
    console.log(selectedValue)
    if(selectedValue == "A favor" || selectedValue == "En contra" || selectedValue == "Abstenerse"){

      if(preguntaNoContestada == true){
        this.guardarResultado(selectedValue);
        this.setState({
          preguntaNoContestada: false,
          txtSeleccionada: selectedValue,
        });
    }
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
    const { pregunta, selectedKey, selectedValue, txtSeleccionada } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.pregunta}>{pregunta}</Text>
        <Text style={styles.label}>Selecciona una opción:</Text>
        <RNPickerSelect
          key={selectedKey}
          onValueChange={(value) => this.setState({ selectedValue: value })}
          items={[
            { label: "A favor", value: "A favor" },
            { label: "En contra", value: "En contra" },
            { label: "Abstenerse", value: "Abstenerse" },
            
          ]}
          value={selectedValue}
        />

        <Button title="Enviar" onPress={this.ContestarPregunta} />
        <Button title="Siguiente Pregunta" onPress={this.siguientePregunta} />
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
export default Votacion;