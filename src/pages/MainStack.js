import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './LoginScreen';
import MyTabs from '../components/MyTabs'

export default function MainStack() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Login" >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyTabs" component={MyTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}