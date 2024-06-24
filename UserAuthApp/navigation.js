import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading">
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    );
};

export default AppNavigator;