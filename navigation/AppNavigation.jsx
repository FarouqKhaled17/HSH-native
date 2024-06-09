import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen.jsx';
import LoginScreen from '../screens/LoginScreen.jsx';
import SignUp from '../screens/SignUp.jsx';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen.jsx';
import OTPScreen from '../screens/OTPScreen.jsx';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ReservationScreen from '../screens/ReservationScreen.jsx';
import ProfileScreen from '../screens/ProfileScreen.jsx';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function AppNavigation() {
  const Stack = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const handleLogout = (navigation) => {
    navigation.navigate('login');
  };

  const MainStack = () => (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="forgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="otp" component={OTPScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  const MainTabs = ({ navigation }) => (
    <Tab.Navigator>
      <Tab.Screen
        name="reserve"
        component={ReservationScreen}
        options={{
          tabBarLabel: 'حجز كشف',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar" color={"black"} size={26} />,
        }}
      />
    
<Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'الملف الشخصي',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={"black"} size={26} />,
        }}
      />

      
<Tab.Screen
        name="logout"
        component={WelcomeScreen} 
        options={{
          tabBarLabel: 'تسجيل خروج',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="logout" color={"black"} size={26} />,
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault(); // Prevent default action (navigation to component)
            handleLogout(navigation); // Call the logout handler
          },
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
