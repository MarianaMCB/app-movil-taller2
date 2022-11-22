import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Button, StyleSheet, Image} from "react-native";
import { Audio } from 'expo-av';


export default function AudioScreen() {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");
  
    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                setMessage("Por favor dar permiso a la app para acceder al microfono")
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        let updateRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updateRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);
    }

    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `0${minutesDisplay}:${secondsDisplay}`;
    }

    function getRcordingLines() {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
                    <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
                </View>
            );
        });
    }

    return (
        <View style={styles.container}>
            <Image source = {require("./assets/pattern-fondo-web.png")} style={[StyleSheet.absoluteFill]}/>
            <Image source = {require("./assets/microphone-g990649857_640.png")} style={{ width: 300, height: 300, marginBottom: 50}}></Image>
            <Text>{message}</Text>
            <Button
                title={recording ? '(Grabando...) Dejar de grabar' : 'Empezar a Grabar'}
                onPress={recording ? stopRecording : startRecording}/>
            {getRcordingLines()}
            <StatusBar style="auto"/>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16
  },
});

