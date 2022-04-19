import { createStackNavigator } from "@react-navigation/stack";
import AttendanceTrackingScreen from './AttendanceTrackingScren';
import ScanQrScreen from './ScanQrScreen';

const Stack = createStackNavigator();

export default function CameraStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Scan Qr Code" component={AttendanceTrackingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Scan Your Face" component={ScanQrScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}