import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import CameraStack from './CameraStack';

const Stack = createStackNavigator();

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Camera'>
                <Stack.Screen name="Camera" component={CameraStack} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}