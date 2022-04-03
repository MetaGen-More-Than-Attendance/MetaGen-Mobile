import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}