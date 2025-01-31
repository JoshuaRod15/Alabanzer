import React, {useEffect, useState} from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from "expo-av";

export default function AudioPlayerScreen({route, navigation}:any) {
    const {songUrl} = route.params
    const [sound, setSound] = useState<Audio.Sound | null>(null)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        (async () => {
            playSong()
        })()
    }, [])

    async function playSong() {
    try {
      console.log("Reproduciendo");
      const { sound } = await Audio.Sound.createAsync({uri:songUrl})
      setSound(sound)
      await sound.playAsync()
      setIsPlaying(true)
    } catch (error) {
      console.log("Error en el audio");
      
    }
    }

    async function pauseSong() {
        if(sound){
            await sound.pauseAsync()
            setIsPlaying(false)
        }
    }

    async function nextSong() {
        pauseSong()
        navigation.replace('QRScanner')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Reproduciendo cancion</Text>
            <Button title='siguiente' onPress={nextSong}></Button>
        </View>
    )

    
}
    const styles = StyleSheet.create({
        container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
        title: { fontSize: 18, marginBottom: 20 },
    });