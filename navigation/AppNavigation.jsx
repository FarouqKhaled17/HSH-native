import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen.jsx';
import LoginScreen from '../screens/LoginScreen.jsx';
import SignUp from '../screens/SignUp.jsx';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen.jsx';
import OTPScreen from '../screens/OTPScreen.jsx';
import Tabs from '../components/Tabs.jsx';

export default function AppNavigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="forgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="otp" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="tab" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
