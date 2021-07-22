import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export default AuthStack = () => (
  <Stack.Navigator initialRouteName='Login' headerMode='none'>
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='Signup' component={SignupScreen} />
  </Stack.Navigator>
);
