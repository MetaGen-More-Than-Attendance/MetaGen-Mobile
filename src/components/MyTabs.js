import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../pages/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CameraStack from '../pages/CameraStack';
import AttendanceReportScreen from '../pages/AttendanceReportScreen';
import ProfileScreen from '../pages/ProfileScreen';

const Tab = createBottomTabNavigator();
const MyTabs = () => {

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName="Profile"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Profile') {
                            iconName = focused
                                ? 'people'
                                : 'people-outline';
                        } else if (route.name === 'Scan') {
                            iconName = focused ? 'scan-circle' : 'scan-circle-outline';
                        }
                        else if (route.name === 'Attendance') {
                            iconName = focused ? 'search' : 'search-outline';
                        }
                        else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }


                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Attendance" component={AttendanceReportScreen} />
                <Tab.Screen name="Scan" component={CameraStack} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>

        </NavigationContainer>
    );
}

export default MyTabs;
