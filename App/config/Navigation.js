import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import Home from '../screens/Home';
import Options from '../screens/Options';
import Hash from '../screens/Hash';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{}}>
    <HomeStack.Screen name='Home' component={Home} options={{ headerTitle: 'Home' }} />
  </HomeStack.Navigator>
);

const HashStack = createStackNavigator();
const HashStackScreen = () => (
  <HashStack.Navigator screenOptions={{}}>
    <HashStack.Screen name='Hash' component={Hash} options={{ headerTitle: 'SHA-256' }} />
  </HashStack.Navigator>
);

const OptionsStack = createStackNavigator();
const OptionsStackScreen = () => (
  <OptionsStack.Navigator screenOptions={{}}>
    <OptionsStack.Screen name='Options' component={Options} />
  </OptionsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name='Home'
      component={HomeStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name='home-sharp' size={props.size} color={props.color} />,
      }}
    />
    <AppTabs.Screen
      name='SHA-256'
      component={HashStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name='lock-closed-sharp' size={props.size} color={props.color} />,
      }}
    />

    <AppTabs.Screen
      name='Options'
      component={OptionsStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name='cog-sharp' size={props.size} color={props.color} />,
      }}
    />
  </AppTabs.Navigator>
);

export default () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar animated barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
        <AppTabsScreen />
      </NavigationContainer>
    </AppearanceProvider>
  );
};
