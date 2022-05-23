import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from 'react-native-paper';
import { FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [data, setData] = useState([])

  useEffect(async () => {
    const studentId = await AsyncStorage.getItem("id");
    const URL = `https://meta-gen.herokuapp.com/api/student/get?studentId=${studentId}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Title style={styles.welcome}>Welcome to MetaGen</Title>
        <Image style={styles.img} source={{ uri: `data:image/png;base64,${data.photo}` }} alt="?" />
        <Title style={styles.name}>{data?.userName}{data?.userSurname}</Title>
        <View style={styles.teo}>
          <View style={styles.icons}>
            <FontAwesome5 name="university" size={24} color="black" style={styles.icon} />
            <FontAwesome name="id-card" size={24} color="black" style={styles.icon} />
            <MaterialIcons name="mail" size={24} color="black" style={styles.icon} />
          </View>
          <View style={styles.datas}>
            <Text style={styles.texts}>{data?.departmentName}</Text>
            <Text style={styles.texts}>{data?.identityNumber}</Text>
            <Text style={styles.texts}>{data?.userMail}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b4c1c2'
  },
  info: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  img: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 80,
  },
  welcome: {
    fontSize: 30,
    marginBottom: 20
  },
  name: {
    fontSize: 30,
    marginBottom: 30
  },

  texts: {
    fontSize: 20,
    marginBottom: 20
  },
  teo: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    marginBottom: 25,
    marginRight: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#00ADB5',
  },
});