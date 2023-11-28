import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

class Votacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntas: [],
      respuestas: [],
      posicion: 0,
      isAFavorPressed: false,
      isEnContraPressed: false,
      isAbstenersePressed: false,
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
    this.ContestarPregunta = this.ContestarPregunta.bind(this);
    this.contestarAfavor = this.contestarAfavor.bind(this);
    this.contestarEnContra = this.contestarEnContra.bind(this);
    this.contestarAbstenerse = this.contestarAbstenerse.bind(this);
  }

  componentDidMount() {
    this.obtenerPreguntas();
  }

  consultaPregunta(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var resp = xhttp.responseText;
        return resp;
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/siguientePregunta.php?id="+id, true);
    xhttp.send();
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
          selectedKey: null,   
        });
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/datosPreguntas.php", true);
    xhttp.send();
  }

  siguientePregunta() {
    const { preguntas, posicion, preguntaNoContestada } = this.state;
    const nuevaPosicion = posicion + 1;
  
    
    //this.guardarResultado(selectedValue);
    if(preguntaNoContestada == true){
      Alert.alert("Falta seleccionar una opcion")
      return;
    } 

    // Consulta si se contesto la pregunta
    //const status = "completa"
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var status = xhttp.responseText;
        if(status != "completa"){
          return
        }

        console.log(status)

        if (nuevaPosicion < preguntas.length - 1) {
          this.setState({
            posicion: nuevaPosicion,
            pregunta: preguntas[nuevaPosicion],
            isAFavorPressed:false,
            isEnContraPressed:false,
            isAbstenersePressed:false,
            selectedValue:"",
            preguntaNoContestada: true,
            txtSeleccionada: "No contestada",
          });
        } else {
          this.setState({
            pregunta: "Fin del cuestionario",
            preguntaNoContestada: true,
            txtSeleccionada: "Espere Instrucciones"
          });
        }
      }
    };
    xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/siguientePregunta.php?id="+nuevaPosicion, true);
    xhttp.send();
    
  }

  ContestarPregunta() {
    const { preguntas, selectedValue, preguntaNoContestada } = this.state;
    console.log(selectedValue)
    console.log("asdsawdaed")

      if(preguntaNoContestada == true && selectedValue != ""){
        this.guardarResultado(selectedValue);
        this.setState({
          preguntaNoContestada: false,
          txtSeleccionada: selectedValue,
        });
        
      }else {
        
      }
  
    
  }

  contestarAfavor() {
    const { preguntaNoContestada, selectedValue } = this.state;
  
    if (!preguntaNoContestada || selectedValue !== "") {
      return;
    }
  
   this.setState(
      {
        selectedValue: "A favor",
        isAFavorPressed: true,
      },
      () => {
        this.ContestarPregunta();
      }
    );
  }

  contestarEnContra() {
    const { preguntaNoContestada, selectedValue} = this.state;

    if(!preguntaNoContestada || selectedValue != "")
      return

    this.setState({
      selectedValue: "En Contra",
      isEnContraPressed: true,
    },
    () => {
      this.ContestarPregunta();
    }
  );
}

  contestarAbstenerse() {
    const { preguntaNoContestada, selectedValue} = this.state;

    if(!preguntaNoContestada || selectedValue != "")
      return

    this.setState({
      selectedValue: "Abstenerse",
      isAbstenersePressed: true,
    },
    () => {
      this.ContestarPregunta();
    }
  );
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
        
        <TouchableOpacity style={this.state.isAFavorPressed ? styles.btn_afavor_pressed : styles.btn_afavor}
          onPress={this.contestarAfavor}>
            <Text style={styles.txt_afavor}>A favor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={this.state.isEnContraPressed ? styles.btn_encontra_pressed : styles.btn_encontra}
          onPress={this.contestarEnContra}>
            <Text style={styles.txt_afavor}>En Contra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={this.state.isAbstenersePressed ? styles.btn_abstenerse_pressed : styles.btn_abstenerse}
          onPress={this.contestarAbstenerse}>
            <Text style={styles.txt_afavor}>Abstenerse</Text>
        </TouchableOpacity>

        <Text style={styles.pregunta}>{txtSeleccionada}</Text>

        <TouchableOpacity style={this.state.preguntaNoContestada ? styles.btn_Siguiente : styles.btn_Siguiente_pressed}
          onPress={this.siguientePregunta}>
            <Text style={styles.txt_Siguiente}>Siguiente Pregunta</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  btn_afavor:{
    marginLeft:40,
    marginRight:40,
    marginBottom:10,
    borderRadius:30,
    backgroundColor: '#5D6D7E',
    width:220,
  },
  btn_afavor_pressed: {
      backgroundColor: 'green',
      marginLeft:40,
      marginRight:40,
      marginBottom:10,
      borderRadius:30,
      width:220,
  },
  txt_afavor:{
    marginTop:16,
    marginBottom:16,
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  btn_encontra:{
    marginLeft:40,
    marginRight:40,
    marginBottom:10,
    borderRadius:30,
    backgroundColor: '#5D6D7E',
    width:220,
  },
  btn_encontra_pressed: {
     backgroundColor: 'red',
     marginLeft:40,
      marginRight:40,
      marginBottom:10,
      borderRadius:30,
      width:220,
  },
  txt_encontra:{
    marginTop:16,
    marginBottom:16,
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  btn_abstenerse:{
    marginLeft:40,
    marginRight:40,
    marginBottom:10,
    borderRadius:30,
    backgroundColor: '#5D6D7E',
    width:220,
  },
  btn_abstenerse_pressed: {
     backgroundColor: 'blue',
     marginLeft:40,
      marginRight:40,
      marginBottom:10,
      borderRadius:30,
      width:220,
  },
  txt_abstenerse:{
    marginTop:16,
    marginBottom:16,
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  btn_guardar:{
    marginLeft:40,
    marginRight:40,
    marginTop:40,
    backgroundColor: '#5D6D7E',
    width:150,
  },
  btn_guardar_pressed: {
    marginLeft:40,
    marginRight:40,
    marginTop:40,
    backgroundColor: '#5D6D7E',
    width:150,
  },
  txt_guardar:{
    marginTop:8,
    marginBottom:8,
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  btn_Siguiente:{
    marginLeft:40,
    marginRight:40,
    marginTop:15,
    backgroundColor: '#5D6D7E',
    width:150,
  },
  btn_Siguiente_pressed: {
    marginLeft:40,
    marginRight:40,
    marginTop:15,
    backgroundColor: '#5D6D7E',
    width:150,
  },
  txt_Siguiente:{
    marginTop:8,
    marginBottom:8,
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:"#17202A",
  },
  pregunta: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    margin: 20,
    marginTop:40,
    color:'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color:'white',
  },
});
export default Votacion;