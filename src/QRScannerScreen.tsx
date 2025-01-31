
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from "expo-camera"
import { useState } from 'react';;


export default function QRScannerScreen({navigation}:any) {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions()
  const [hasScanned, setHasScanned] = useState(false)

  if(!permission) {
    return <View/>
  }

  if(!permission.granted){
    return(
      <View style={styles.container}>
        <Text style={styles.message}> Necesitamos los permisos</Text>
        <Button onPress={requestPermission} title='grant permission'></Button>
      </View>  
    )
  }

  function toggleCameraFacing() {
    setFacing (current => (current === 'back' ? 'front' : 'back'))
  }

  const handleBarCodeScanned = (scanData: { data: string; bounds: { origin: { x: number; y: number}; size: { width: number; height: number }}} ) => {

    if (hasScanned) return;

    const scanFrameX = (width - scanFrameSize) / 2;
    const scanFrameY = (height - scanFrameSize) / 2;

    const qrX = scanData.bounds.origin.x;
    const qrY = scanData.bounds.origin.y;
    const qrWidth = scanData.bounds.size.width;
    const qrHeight = scanData.bounds.size.height;

    if(qrX >= scanFrameX && 
       qrY >= scanFrameY && 
       qrX + qrWidth <= scanFrameX + scanFrameSize && 
       qrY + qrHeight <= scanFrameY + scanFrameSize)
      {
        console.log("Escaneando código:", scanData.data);
        setHasScanned(true); 
        navigation.replace('AudioPlayer', { songUrl: scanData.data})
      }
  };


  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        onBarcodeScanned={(scanData) => {
          handleBarCodeScanned(scanData); // Aquí pasas solo el string al método
        }}
      />

      <View style={styles.overlay}>
        <View style={styles.topLayer} />

        <View style={styles.middleLayer}>
        <View style={styles.sideLayer} />
        <View style={styles.scanFrameContainer}>
          <View style={styles.scanFrame} />
        </View>
        <View style={styles.sideLayer} />
        </View>
        <View style={styles.bottomLayer} />
      </View>
    </View>

  );
}

const {width, height} = Dimensions.get('window')
const scanFrameSize = 250

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topLayer: {
    height: (height - scanFrameSize) / 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  middleLayer: {
    flexDirection: 'row',
    width: '100%',
    height: scanFrameSize,
  },
  sideLayer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  scanFrameContainer: {
    width: scanFrameSize,
    height: scanFrameSize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanFrame: {
    width: scanFrameSize,
    height: scanFrameSize,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transaprent'
  },
  bottomLayer: {
    height: (height - scanFrameSize) / 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
