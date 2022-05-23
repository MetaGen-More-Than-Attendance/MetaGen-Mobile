import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { any } from "react-native/Libraries/Text/TextNativeComponent";

const Attendance = ({ route }) => {
  const lectureId = route.params.data;
  const [data, setData] = useState([]);
  const object = { date2: {}, status2: {} };
  const [attendance, setAttendances] = useState([]);
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
          3;
        }
        setData([...detailData]);
      });
  }, []);
  console.log(data);
  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title style={styles.header}>Date</DataTable.Title>
          <DataTable.Title style={styles.header}>Absenteeism</DataTable.Title>
        </DataTable.Header>
        {data.map((tarih) => {
          return (
            <DataTable.Row>
              <DataTable.Cell style={styles.cell}>{tarih.date}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {tarih.attendance ? "✅" : "❌"}
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
    justifyContent: "center",
  },
  table: {
    backgroundColor: "orange",
  },
  header: {
    justifyContent: "center",
  },
  cell: {
    justifyContent: "center",
  },
});
