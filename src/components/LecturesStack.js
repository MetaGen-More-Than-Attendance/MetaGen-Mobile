import { createStackNavigator } from "@react-navigation/stack";
import Attendance from "../pages/Attendance";
import AttendanceReportScreen from "../pages/AttendanceReportScreen";

const Stack = createStackNavigator();

export default function LecturesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lectures"
        component={AttendanceReportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
