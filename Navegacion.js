import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LOGIN from "./Login";
import VOTACION from "./Votacion";
import ADMINISTRADOR from "./Administrador";

export default class Navegacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LOGIN} options={{headerShown:false}}/>
          <Stack.Screen name="Votacion" component={VOTACION} options={{headerShown:false}}/>
          <Stack.Screen name="Administrador" component={ADMINISTRADOR} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
