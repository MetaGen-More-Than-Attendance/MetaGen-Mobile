import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ScanQrScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState("");
  const [showCamera, setShowCamera] = useState(true);
  const [faces, setFaces] = useState([]);
  const [flash, setFlash] = useState(false);
  const [flashIcon, setFlashIcon] = useState("md-flash-off");
  const URL = "https://192.168.1.31:5000/";

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  const alertWithoutButtons = (alertMessage) => {
    const title = "";
    const message = alertMessage;
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };

    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      await handleSave(data.uri);
    }
  };

  const handleFlashMode = async () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const handleReturnCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleSave = async (image) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    // const { status } = await Camera.Permissions.MEDIA_LIBRARY;
    if (status === "granted") {
      setShowCamera(false);
      alertWithoutButtons("Face is recogniting please wait!");
      const assert = await MediaLibrary.createAssetAsync(image);
      MediaLibrary.createAlbumAsync("MetaGen", assert);
      let formData = new FormData();
      formData.append("file", {
        uri: assert.uri,
        type: "image/jpeg",
        name: assert.filename,
      });
      let studentId = await AsyncStorage.getItem("id");
      let lectureId = route.params.lectureId;
      console.log(
        JSON.stringify({
          absenteeismDate: new Date(),
          absenteeism: "true",
          lectureId: lectureId,
          studentId: studentId,
        })
      );
      fetch("https://metagen-flask.herokuapp.com/video_feed/" + studentId, {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "true") {
            fetch(
              "https://meta-gen.herokuapp.com/api/absenteeism/updateAbseenteism",
              {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  absenteeismDate: new Date(),
                  absenteeism: "true",
                  lectureId: lectureId,
                  studentId: studentId,
                }),
              }
            );
            alertWithoutButtons("Attendance is succesful");
          } else {
            alertWithoutButtons("Attendance failed");
          }
          console.log(responseJson);
          //this.setState({pressed: false});
        });
    } else {
      console.log("You missed to give permission !");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        {/* {!showCamera && (
          <Image style={{ width: 100, height: 100 }} source={{ uri: image }} />
        )} */}
        {showCamera && (
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={"1:1"}
            flashMode={flash}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 1000,
              tracking: false,
            }}
          >
            <TouchableOpacity
              style={{
                width: 50,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <Ionicons
                name="ios-refresh-circle"
                size={50}
                onPress={() => handleReturnCamera()}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: "absolute",
                marginLeft: 330,
                marginTop: 10,
              }}
            >
              <Ionicons
                name={flashIcon}
                size={50}
                onPress={() => handleFlashMode()}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: "absolute",
                marginTop: 650,
                marginLeft: 175,
              }}
            >
              <Ionicons
                name="radio-button-on-outline"
                size={80}
                onPress={() => takePicture()}
              />
            </TouchableOpacity>
          </Camera>
        )}
      </View>
    </View>
  );
};

export default ScanQrScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
