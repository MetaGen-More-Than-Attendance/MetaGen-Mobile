import React from 'react'
import { Text, View, Button, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {

  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token')
  //   } catch (e) {
  //     console.log("error" + e)
  //   }
  //   console.log('Token is removed ...')
  // }

  // const handleLogOut = () => {
  //   removeToken();
  //   navigation.navigate('Login', { screen: 'MyTabs' });
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is Profile Screen !</Text>
      {/* <Button title="LOG OUT" onPress={handleLogOut} /> */}
    </View>
  );
};

export default ProfileScreen;
