import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";

const URL = "https://meta-gen.herokuapp.com/test";

const getDataUsingSimpleGetCall = () => {
  console.log("test");
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    })
    .finally(function () {
      // always executed
      console.log("Finally called");
    });
};

const AttendanceReport = () => {
  return (
    <View style={styles.container}>
      <Text onPress={() => getDataUsingSimpleGetCall()}>
        AttendanceReport Pages
      </Text>
    </View>
  );
};

export default AttendanceReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
