import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet, ActivityIndicator} from "react-native";

import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { async } from "@firebase/util";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { firebaseConfig } from "./firebase-config";
//import App from "./App";

export default function ImagenPicker() {
  

  //if (!firebase.apps.length) {
    //firebase.initializeApp(firebaseConfig);
  //}
  

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob)

    snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED,
    ()=>{
      setUploading(true)
    },
    (error)=>{
      setUploading(false)
      console.log(error);
      blob.close()
      return
    },
    ()=>{
      snapshot.snapshot.ref.getDownloadURL().then((url)=>{
        setUploading(false)
        console.log("download url : ", url);
        blob.close();
        return url;
      });
    }
    );

  }

  return (
    <View style={styles.container}>
      <Image source = {require("./assets/pattern-fondo-web.png")} style={[styles.image, StyleSheet.absoluteFill]}/>
      <Image source={{ uri : image }} style={{ width: 300, height: 300, marginBottom: 50}}/>
      <Button title="Elegir Imagen" onPress={pickImage}/>
      {!uploading ? (
        <Button title="Subir a Firebase" onPress={uploadImage} />
      ) : (
        <ActivityIndicator size="large" color="#000"/>
        )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})


