import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './LoginScreen';
import MyTabs from '../components/MyTabs'

export default function MainStack() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyTabs"
                    component={MyTabs}
                    options={{
                        headerTitle: 'Log out',
                        headerStyle: {
                            backgroundColor: '#222831'
                        },
                        headerTintColor: '#00ADB5',
                        headerTitleStyle: {
                            backgroundColor: '#00ADB5',
                            padding: 5,
                            borderRadius: 10,
                            marginLeft: -30,
                            fontSize: 15,
                            color: 'white'
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


/*
options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: () => (
                        <Button title="info" onPress={() => navigation.reset()} />
                    )
                }}

*/

 // options={
                //     { headerTitle: 'Log out' }
                // }
                // options={{
                //     headerLeft: () => (
                //         <TouchableOpacity>
                //             <View style={{ backgroundColor: 'red', padding: 10, marginLeft: 5, borderRadius: 15 }}>
                //                 <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Log out</Text>
                //             </View>
                //         </TouchableOpacity>
                //     )
                // }}