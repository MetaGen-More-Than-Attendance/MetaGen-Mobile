import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { DataTable, Title } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';

const Attendance = ({ route }) => {
  const [data, setData] = useState([]);
  const lectureId = route.params.data;
  const lectureName = route.params.lectureName;

  useEffect(async () => {
    let studentId = await AsyncStorage.getItem("id");
    const URL = `https://meta-gen.herokuapp.com/api/absenteeism/getAbseenteismByStudentIdAndLectureId?lectureId=${lectureId}&studentId=${studentId}&semesterId=1`;
    fetch(URL)
      .then((response) => response.json())
      .then((data2) => {
        const detailData = [];
        for (const [key, value] of Object.entries(data2)) {
          let date = key;
          let attendance;
          for (const [key, childValue] of Object.entries(value)) {
            attendance = childValue;
          }
          detailData.push({ date: date, attendance: attendance });
        }
        setData([...detailData]);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.welcome}>{lectureName} </Title>
      <Title style={styles.welcome}>My Status</Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.header}>
            <Text style={styles.headerText}>Date</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.header}>
            <Text style={styles.headerText}>Attendance</Text>
          </DataTable.Title>
        </DataTable.Header>
        {data.map((e) => {
          return (
            <DataTable.Row key={e.date}>
              <DataTable.Cell style={styles.cell}>{e.date}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {e.attendance ? <FontAwesome name="check" size={24} color="green" /> : <FontAwesome name="close" size={24} color="red" />}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#b4c1c2",
  },
  header: {
    justifyContent: "center",
  },
  cell: {
    justifyContent: "center",
  },
  welcome: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center'
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold"
  }
});
