import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QRScannerScreen from './src/QRScannerScreen'
import AudioPlayerScreen from './src/AudioPlaayerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='QRScanner'>
        <Stack.Screen name='QRScanner' component={QRScannerScreen} options={{title: 'Escanea QR'}} />
        <Stack.Screen name='AudioPlayer' component={AudioPlayerScreen} options={{title: 'Reproductor'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
