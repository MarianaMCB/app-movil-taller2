import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, PanResponder } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';


const ImageScreen = () => {

    const [image, setImage] = useState('https://via.placeholder.com/200')
    
    const selectImage = () => {

        const options = {
            title: 'Selecciona una imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }

        launchImageLibrary(options, response => {

            if(response.errorCode) {
                console.log(response.errorMessage)
            } else if (response.didCancel) {
                console.log("El usuario canceló la selección")
            } else {

                const path = response.uri
                setImage(path)

            }

        })

    }

    return (
        <View>
            <Button 
                title = "Seleccionar Imagen"
                onPress = { selectImage }
            />
            

            <Image source = {{ uri: image }}
                style = {{
                    alignSelf: 'center',
                    height: 200,
                    width: 200,
                    backgroundColor: 'purple',
                }}
            />
        </View>
    )
}

export default ImageScreen