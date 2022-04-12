import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Text, Image } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text style={styles.welcome}>Welcome to MetaGen</Text>

      <Image style={styles.icon} source={require('../../assets/favicon.png')} />

      <Text style={styles.emailText}>Email</Text>

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
      </View>

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
  }
})
