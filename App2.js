import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React from "react";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ImagenPicker from './ImagenPicker';
import AudioScreen from './AudioScreen'; 

function HomeScreen() {

  const navigation = useNavigation();

  const NavegarLogin = () => {
    navigation.navigate('Login');
  }

  const NavegarSeccion = () => {
    navigation.navigate('SeccionParticipativa');
  }

  const NavegarAsistente = () => {
    navigation.navigate('Asistente');
  }

  const NavegarAjustes = () => {
    navigation.navigate('Ajustes');
  }

  const NavegarPerfil = () => {
    navigation.navigate('Perfil');
  }

  const NavegarAudio = () => {
    navigation.navigate('Audio');
  }
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source = {require("./assets/pattern-fondo-web.png")} style={[styles.image, StyleSheet.absoluteFill]}/>
      <View style={styles.contenedorLogo}>
        <Image source = {require("./assets/logo-negativo-utadeo.png")} style={styles.logo}/>
      </View>
      <ScrollView contentContainerStyle= {{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={styles.contenedorUsuario}>
        <TouchableOpacity onPress={NavegarPerfil}>
          <Image source = {require("./assets/imagen-usuario-por-defecto-app-movil.png")} style={styles.fotoPerfil}/>
        </TouchableOpacity>
          <Text style={styles.titulo}>¡Bienvenido!</Text>
        </View>
        <TouchableOpacity onPress={NavegarAudio} style={[styles.botonAzul, {marginTop: 40}]}>
          <Text style={styles.letra}>SECCIÓN PARTICIPATIVA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={NavegarAsistente} style={styles.botonAzul}>
          <Text style={styles.letra}>ASISTENTE VIRTUAL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={NavegarAjustes} style={[styles.botonAzul, {marginBottom: 40}]}>
          <Text style={styles.letra}>AJUSTES APP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={NavegarLogin} style={styles.botonCerrarSesion}>
          <Text style={styles.letra}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function LoginScreen() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account Created!')
      const user = userCredential.user;
      console.log(user)
      Alert.alert("Usuario Registrado correctamente. Oprimir el boton de Ingresar")
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed In!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
      Alert.alert("Usuario y/o contraseña incorrecta")
    })
  }

  return (
    <View style={styles.container}>
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
            <TextInput onChangeText={(text) => setEmail(text)} style={[styles.input]} placeholder="Ingresar correo"/>
          </View>
          <View>
            <Text style={styles.letra}>Contraseña</Text>
            <TextInput onChangeText={(text) => setPassword(text)} style={[styles.input]} placeholder="Ingresar contraseña" secureTextEntry={true}/>
          </View>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.letra}>INGRESAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={styles.letra}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function SeccionParticipativaScreen() {

  const navigation = useNavigation();

  const NavegarAudio = () => {
    navigation.navigate('Audio');
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source = {require("./assets/pattern-fondo-web.png")} style={[styles.image, StyleSheet.absoluteFill]}/>
      <View style={styles.contenedorLogo}>
        <Image source = {require("./assets/logo-negativo-utadeo.png")} style={styles.logo}/>
      </View>
      <ScrollView contentContainerStyle= {{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={styles.contenedorUsuario}>
          <Image source = {require("./assets/imagen-perfil-anna-base.png")} style={styles.fotoPerfil}/>
          <Text style={styles.titulo}>¡Bienvenido!</Text>
        </View>
        <TouchableOpacity style={[styles.botonAzul, {marginTop: 40}]}>
          <Text style={styles.letra}>SECCIÓN PARTICIPATIVA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonAzul}>
          <Text style={styles.letra}>ASISTENTE VIRTUAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botonAzul, {marginBottom: 40}]}>
          <Text style={styles.letra}>AJUSTES APP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCerrarSesion}>
          <Text style={styles.letra}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function AsistenteScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source = {require("./assets/pattern-fondo-web.png")} style={[styles.image, StyleSheet.absoluteFill]}/>
      <View style={styles.contenedorLogo}>
        <Image source = {require("./assets/logo-negativo-utadeo.png")} style={styles.logo}/>
      </View>
      <ScrollView contentContainerStyle= {{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={styles.contenedorUsuario}>
          <Image source = {require("./assets/imagen-perfil-anna-base.png")} style={styles.fotoPerfil}/>
          <Text style={styles.titulo}>¡Bienvenido!</Text>
        </View>
        <TouchableOpacity style={[styles.botonAzul, {marginTop: 40}]}>
          <Text style={styles.letra}>SECCIÓN PARTICIPATIVA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonAzul}>
          <Text style={styles.letra}>ASISTENTE VIRTUAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botonAzul, {marginBottom: 40}]}>
          <Text style={styles.letra}>AJUSTES APP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCerrarSesion}>
          <Text style={styles.letra}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function AjustesScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source = {require("./assets/pattern-fondo-web.png")} style={[styles.image, StyleSheet.absoluteFill]}/>
      <View style={styles.contenedorLogo}>
        <Image source = {require("./assets/logo-negativo-utadeo.png")} style={styles.logo}/>
      </View>
      <ScrollView contentContainerStyle= {{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={styles.contenedorUsuario}>
          <Image source = {require("./assets/imagen-perfil-anna-base.png")} style={styles.fotoPerfil}/>
          <Text style={styles.titulo}>¡Bienvenido!</Text>
        </View>
        <TouchableOpacity style={[styles.botonAzul, {marginTop: 40}]}>
          <Text style={styles.letra}>SECCIÓN PARTICIPATIVA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonAzul}>
          <Text style={styles.letra}>ASISTENTE VIRTUAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botonAzul, {marginBottom: 40}]}>
          <Text style={styles.letra}>AJUSTES APP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCerrarSesion}>
          <Text style={styles.letra}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function PerfilScreen() {
  return (
    <View>
      <ImagenPicker />
    </View>
  );
}

function AudiosScreen() {
  return (
    <View>
      <AudioScreen />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SeccionParticipativa" component={SeccionParticipativaScreen}/>
        <Stack.Screen name="Asistente" component={AsistenteScreen}/>
        <Stack.Screen name="Ajustes" component={AjustesScreen}/>
        <Stack.Screen name="Perfil" component={PerfilScreen}/>
        <Stack.Screen name="Audio" component={AudiosScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
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
  contenedorLogo: {
    width: '100%',
    height: 130,
    backgroundColor: '#315275',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 2,
    alignItems: 'center',
  },
  contenedorUsuario: {
    width: '100%',
    height: '20%',
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    marginVertical: 10,
    backgroundColor: '#5f9950',
    borderRadius: 12,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 40,
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    marginRight: 30,
  },
  botonAzul: {
    width: 300,
    height: 50,
    borderRadius: 12,
    borderBottomRightRadius: 6,
    backgroundColor: '#509999',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    borderColor: '#1D3045',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
  },
  botonCerrarSesion: {
    width: 220,
    height: 50,
    borderRadius: 12,
    borderBottomRightRadius: 6,
    backgroundColor: '#5f9950',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#37462C',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    marginBottom: 40,
  }
});
