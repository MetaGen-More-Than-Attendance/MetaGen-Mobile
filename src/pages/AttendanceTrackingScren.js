import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Title } from "react-native-paper";

const AttendanceTrackingScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Attendance request was sent. Please scan your face.`);
    navigation.navigate("Scan Your Face", { lectureId: data });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionScreen}>
        <Title style={styles.permissionText}>Requesting for camera permission</Title>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionScreen}>
        <Title style={styles.noAccessText}>No access to camera</Title>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned ? (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.loginText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.cameraFrame}>
            <Image style={styles.icon} source={require("../../assets/qrScannerFrame.png")} />
          </View>
        </BarCodeScanner>
      )}
    </View>
  );
};

export default AttendanceTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#b4c1c2'
  },
  cameraFrame: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  },
  permissionScreen: {
    flex: 1,
    backgroundColor: '#222831',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 20,
    fontWeight: "500",
    color: 'white'
  },
  noAccessText: {
    fontSize: 20,
    fontWeight: "500",
    color: 'red'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 3,
    backgroundColor: '#00ADB5',
  },
  icon: {
    width: 300,
    height: 300,
  },
});
