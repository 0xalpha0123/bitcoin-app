import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import Home from '../screens/Home';
import Options from '../screens/Options';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator
  // headerMode='none'
  // initialRouteName='Options'
  >
    <MainStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
    <MainStack.Screen name='Options' component={Options} />
  </MainStack.Navigator>
);

export default () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MainStackScreen />
      </NavigationContainer>
    </AppearanceProvider>
  );
};
