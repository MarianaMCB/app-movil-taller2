import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React from "react";


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Image source = {require("./assets/pattern-fondo-web.png")} style={[styles.image, StyleSheet.absoluteFill]}/>
      <ScrollView contentContainerStyle= {{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={styles.login}>
        <Image source = {require("./assets/logo-negativo-utadeo.png")} style={styles.logo}/>
        <View>
          <Text style={styles.titulo}>Iniciar Sesión/Registrarse</Text>
        </View>
        <View>
          <Text style={styles.letra}>Correo</Text>
          <TextInput style={[styles.input]} placeholder="Ingresar correo"/>
        </View>
        <View>
          <Text style={styles.letra}>Contraseña</Text>
          <TextInput style={[styles.input]} placeholder="Ingresar contraseña" secureTextEntry={true}/>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.letra}>INGRESAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.letra}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: 550,
    backgroundColor: '#315275',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 50,
    marginVertical: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '400',
    color: '#F9F8F3',
    marginBottom: 30,
    textAlign: 'center',
  },
  letra: {
    fontSize: 18,
    fontWeight: '400',
    color: '#F9F8F3',
  },
  input: {
    width: 300,
    height: 50,
    borderColor: '#A8C1DB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#F9F8F3',
    fontSize: 16,
    fontWeight: '400',
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#5f9950',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#37462C',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
  },
});