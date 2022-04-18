import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Text, Image, ActivityIndicator } from "react-native";
import { Formik, Field } from 'formik';
import LoginService from "../services/loginService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  let loginService = new LoginService();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text style={styles.welcome}>Welcome to MetaGen</Text>

      <Image style={styles.icon} source={require('../../assets/favicon.png')} />

      <Formik
        initialValues={{ username: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = '*';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
          ) {
            errors.username = 'Invalid';
          }
          if (!values.password) {
            errors.password = "*";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          loginService.login(values)
            .then((result) => {
              console.log("test");
              console.log(result);
              AsyncStorage.setItem("token", result.data.token);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${result.data}`;

              resetForm();
              navigation.navigate("MyTabs")
            })
            .catch(() => {
              alert("Wrong email or password")
              resetForm();
            });

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {errors.username && touched.username && (
                <View>
                  <Text style={{ color: "red" }}>{errors.username}</Text>
                </View>
              )}
              <Text style={styles.emailText}>Email</Text>
            </View>

            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder='Enter email'
              keyboardType="email-address"
              style={styles.input}
            />

            <View style={{ display: "flex", flexDirection: 'row', }}>
              {errors.password && touched.password && (
                <View>
                  <Text style={{ color: "red" }}>{errors.password}</Text>
                </View>
              )}
              <Text style={styles.emailText}>Password</Text>
            </View>

            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder='Enter password'
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType='newPassword'
              secureTextEntry
            />

            <View style={{ marginTop: 10 }}>
              <Button title="LOGIN" onPress={handleSubmit} style={styles.login} />
            </View>

          </>
        )}
      </Formik>

    </View >
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    fontWeight: '100',
    marginBottom: 20
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  emailText: {
    width: '60%',
    alignItems: 'flex-start',
    fontSize: 15
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '60%',
    borderRadius: 10,
    backgroundColor: 'white'
  },
})
