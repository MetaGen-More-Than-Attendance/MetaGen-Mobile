import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AttendanceReport = ({ navigation }) => {
  const [lecture, setlecture] = useState([]);
  const getId = async () => { };
  useEffect(async () => {
    let studentId = await AsyncStorage.getItem("id");
    const URL = `https://meta-gen.herokuapp.com/api/student/${studentId}/lecture`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setlecture(data));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.cards}>
          {lecture?.map((data) => {
            return (
              <Card
                style={styles.cardView}
                key={data.lectureId}
                onPress={() =>
                  navigation.navigate("Attendance", {
                    data: data.lectureId,
                  })
                }
              >
                <Card.Content>
                  <Title>{data.lectureName}</Title>
                  <Paragraph>{data.instructorName}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: "https://picsum.photos/700" }} style={styles.cover} />
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AttendanceReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b4c1c2'
  },
  cards: {
    width: "100%",
    height: "50%",
    padding: 50,
  },
  cardView: {
    borderRadius: 50,
    elevation: 20
  },
  cover: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  }
});
