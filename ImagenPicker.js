import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet} from "react-native";

import * as FireBase from 'firebase'
import * as ImagePicker from 'expo-image-picker';

export default function ImagenPicker() {
  
  const [image, setImage] = useState(null);

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
  
  
  return <View style={styles.container}>
      <Image/>
      <Button title="choose picture" onPress={pickImage}/>
      <Button title="upload" onPress={''}/>
    </View>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


