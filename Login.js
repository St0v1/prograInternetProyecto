import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, ImageBackground, TouchableOpacity } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo:"",
      password:"",
    };
  }

  render() {

    const clic_ingresar = () => {
      console.log("press");
      var xhttp = new XMLHttpRequest();
      var conexion = false;
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText === "3"){
              Alert.alert("Correo desconocido, Registrate");
          }else{
            if(xhttp.responseText === "0"){
              Alert.alert("Password malo. intenta de nuevo");
            }else{
              this.props.navigation.navigate("Votacion");
            }
          }
        }
      };
      //xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/datos2.php?nombre=alex&correo=abc@&password=12345", true);
      xhttp.open("GET", "https://programacion-para-internet-i5909.000webhostapp.com/2023B/loginVotantes.php?correo="+ this.state.correo +"&password=" + this.state.password, true);
      xhttp.send();
      
    }

    return (
      
      <View style={styles.container}>
    <ImageBackground source={require('./img/fondo_edificio_udg.jpg')} resizeMode="cover" blurRadius={10} style={styles.image}>
      <View style={styles.fondo_login}>
    
      <Text style={styles.txt_login}>Login</Text>
      <TextInput onChangeText={correo => this.setState({correo})}
        style={styles.input}
        placeholder="email"
      />
      <TextInput onChangeText={password => this.setState({password})}
        style={styles.input}
        placeholder="password"
      />
       <TouchableOpacity style={styles.btn_entrar} onPress={ clic_ingresar }>
            <Text style={styles.txt_entrar}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
      
    </ImageBackground>
  </View>
      
    );
  }
}

const styles = StyleSheet.create({
  fondo:{
      paddingTop: 50,
      marginTop: 150,
      marginLeft:30,
      width: 340,
      height:260,
      backgroundColor:"#df371c",
      borderRadius:20,
      
  },

  fondo_login:{
    width: 340,
    height:400,
    marginTop: 150,
    marginLeft:30,
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    borderRadius:16,
  },

  txt_login:{
    color: 'white',
    fontSize: 32,
    lineHeight: 84,
    fontWeight: 'bold',
    marginLeft:30,
  },

  input: {
    height: 40,
    marginLeft: 24,
    marginRight: 24,
    borderWidth: 1.5,
    padding: 10,
    borderColor:'white',
    color: 'white',
    borderRadius:10,
    marginBottom:24,
  },

  img_logo:{
    marginLeft:5,
    width: 160,
    height: 220,
    backgroundColor: '#000000c0',
  },

  btn_entrar:{
    marginLeft:40,
    marginRight:40,
    borderRadius:10,
    backgroundColor: '#00646464',
  },

  txt_entrar:{
    margin:12,
    color:'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },


container: {
  flex: 1,
},
image: {
  flex: 1,
  justifyContent: 'center',
},
text: {
  color: 'white',
  fontSize: 42,
  lineHeight: 84,
  fontWeight: 'bold',
  textAlign: 'center',
  backgroundColor: '#000000c0',
},

})