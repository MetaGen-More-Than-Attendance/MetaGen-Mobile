import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const ScanQrScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState("");
  // const [showCamera, setShowCamera] = useState(true);
  const [faces, setFaces] = useState([]);
  const [flash, setFlash] = useState(false);
  const [handleChangeFlashIcon, setHandleChangeFlashIcon] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [text, setText] = useState("Face is recogniting please wait!");
  const URL = "https://192.168.1.31:5000/";

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  const alertWithoutButtons = (alertMessage) => {
    const title = "";
    const message = alertMessage;
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: false,
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
    setHandleChangeFlashIcon(!handleChangeFlashIcon);
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
      setModalVisible(true);

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

            setText("Attendance is succesful");

            setTimeout(() => {
              return setModalVisible(false);
            }, 900);

            setTimeout(() => {
              return navigation.navigate("Attendance");
            }, 1000);
          } else {
            setText("Attendance is failed");
            setTimeout(() => {
              return setModalVisible(false);
            }, 900);
            setTimeout(() => {
              return navigation.navigate("Attendance");
            }, 1000);
          }
        })
        .catch((error) => {
          setText("Attendance is failed");
          setTimeout(() => {
            return setModalVisible(false);
          }, 900);
          setTimeout(() => {
            return navigation.navigate("Attendance");
          }, 1000);
        });
    } else {
      alertWithoutButtons("You missed to give permission !");
    }
  };

  const handleResponse = () => {
    if (text === "Face is recogniting please wait!")
      return <ActivityIndicator size="large" color="#00ADB5" />;
    if (text === "Attendance is succesful") {
      return <FontAwesome name="check" size={35} color="green" />;
    }
    if (text === "Attendance is failed") {
      return <FontAwesome name="close" size={35} color="red" />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
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
            <MaterialIcons
              name="flip-camera-ios"
              size={50}
              color="#00ADB5"
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
              name={
                handleChangeFlashIcon === false ? "md-flash-off" : "md-flash"
              }
              size={50}
              color="#00ADB5"
              i
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
              color="#00ADB5"
              size={80}
              onPress={() => takePicture()}
            />
          </TouchableOpacity>
        </Camera>

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{text}</Text>
              {handleResponse()}
            </View>
          </View>
        </Modal>
        {/* )} */}
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
  text: {
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#222831",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  modalText: {
    textAlign: "center",
    color: "white",
    marginBottom: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#00ADB5",
    marginTop: 5,
  },
});
