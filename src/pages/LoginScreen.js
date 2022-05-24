import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import { Formik, Field } from "formik";
import LoginService from "../services/loginService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  let loginService = new LoginService();
  const [modalVisible, setModalVisible] = useState(false);

  const storeData = async (value) => {
    try {
      const userId = JSON.stringify(value.userDto.userId);
      const userMail = JSON.stringify(value.userDto.userMail);
      const userName = JSON.stringify(value.userDto.userName);
      const userSurname = JSON.stringify(value.userDto.userSurname);

      await AsyncStorage.setItem("token", value.token);
      await AsyncStorage.setItem("id", userId);
      await AsyncStorage.setItem("userMail", userMail);
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("userSurname", userSurname);
    } catch (e) {
      console.log("error" + e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#222831', }}>

      <Text style={styles.welcome}>MetaGen</Text>
      <Image style={styles.icon} source={require("../../assets/metagenLogo.png")} />
      <Text style={styles.banner}>More Than Attendance</Text>

      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "*";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
          ) {
            errors.username = "Invalid";
          }
          if (!values.password) {
            errors.password = "*";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          loginService
            .login(values)
            .then((result) => {
              storeData(result.data);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${result.data}`;

              resetForm();
              navigation.navigate("MyTabs");
            })
            .catch(() => {
              setModalVisible(true)
              resetForm();
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={{ display: "flex", flexDirection: "row" }}>
              {errors.username && touched.username && (
                <View>
                  <Text style={{ color: "#00ADB5" }}>{errors.username}</Text>
                </View>
              )}
              <Text style={styles.emailText}>Email</Text>
            </View>

            <TextInput
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              placeholder="Enter email"
              keyboardType="email-address"
              style={styles.input}
            />

            <View style={{ display: "flex", flexDirection: "row" }}>
              {errors.password && touched.password && (
                <View>
                  <Text style={{ color: "#00ADB5" }}>{errors.password}</Text>
                </View>
              )}
              <Text style={styles.emailText}>Password</Text>
            </View>

            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Enter password"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry
            />

            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>

          </>
        )}
      </Formik>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Wrong email or password !</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Try Again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  welcome: {
    fontSize: 30,
    fontWeight: "100",
    marginBottom: 15,
    color: '#00ADB5'
  },
  banner: {
    fontSize: 20,
    fontWeight: "100",
    marginBottom: 12,
    color: '#00ADB5'
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  emailText: {
    width: "60%",
    alignItems: "flex-start",
    fontSize: 15,
    color: 'white'
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: "60%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#00ADB5',
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    marginTop: 22
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#00ADB5",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: "black",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  }
});
