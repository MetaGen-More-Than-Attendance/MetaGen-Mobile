import { View, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => navigation.navigate("Profile")}
        title="Login"
        color="#000"
      />
    </View>
  );
};

export default LoginScreen;
