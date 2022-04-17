import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Text, Image } from "react-native";
import { Formik, Field } from 'formik';

const LoginScreen = ({ navigation }) => {
  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text style={styles.welcome}>Welcome to MetaGen</Text>

      <Image style={styles.icon} source={require('../../assets/favicon.png')} />

      {/* <Text style={styles.emailText}>Email</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholder='Enter email' />

      <Text style={styles.emailText}>Password</Text>

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        name='password'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='newPassword'
        secureTextEntry
        value={password}
        enablesReturnKeyAutomatically />

      <View style={{ marginTop: 10 }}>
        <Button title="LOGIN" style={styles.login} onPress={() => navigation.navigate("Profile")} />
      </View> */}

      <Formik
        initialValues={{ email: '', pwd: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = '*';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid';
          }
          if (!values.pwd) {
            errors.pwd = "*";
          }

          return errors;
        }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {errors.email && touched.email && (
                <View>
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                </View>
              )}
              <Text style={styles.emailText}>Email</Text>
            </View>

            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder='Enter email'
              keyboardType="email-address"
              style={styles.input}
            />

            <View style={{ display: "flex", flexDirection: 'row', }}>
              {errors.pwd && touched.pwd && (
                <View>
                  <Text style={{ color: "red" }}>{errors.pwd}</Text>
                </View>
              )}
              <Text style={styles.emailText}>Password</Text>
            </View>

            <TextInput
              onChangeText={handleChange('pwd')}
              onBlur={handleBlur('pwd')}
              value={values.pwd}
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
