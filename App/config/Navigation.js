import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Hash from '../screens/Hash';
import Sats from '../screens/Sats';

import Settings from '../screens/Settings';

const BitcoinStack = createStackNavigator();
const BitcoinStackScreen = () => (
  <BitcoinStack.Navigator screenOptions={{}}>
    <BitcoinStack.Screen
      name='Bitcoin'
      component={Home}
      options={{
        headerTitle: 'Bitcoin',
      }}
    />
  </BitcoinStack.Navigator>
);

const HashStack = createStackNavigator();
const HashStackScreen = () => (
  <HashStack.Navigator screenOptions={{}}>
    <HashStack.Screen name='SHA-256' component={Hash} />
  </HashStack.Navigator>
);

const SatsStack = createStackNavigator();
const SatsStackScreen = () => (
  <SatsStack.Navigator>
    <SatsStack.Screen name='Sats' component={Sats} />
  </SatsStack.Navigator>
);

const BTCTabs = createBottomTabNavigator();
const BTCTabsScreen = () => (
  <BTCTabs.Navigator>
    <BTCTabs.Screen
      name='Bitcoin'
      component={BitcoinStackScreen}
      options={{
        tabBarIcon: (props) => <FontAwesome5 name='bitcoin' size={props.size} color={props.color} />,
      }}
    />
    <BTCTabs.Screen
      name='SHA-256'
      component={HashStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name='lock-closed-sharp' size={props.size} color={props.color} />,
      }}
    />
    <BTCTabs.Screen
      name='Sats'
      component={SatsStackScreen}
      options={{ tabBarIcon: (props) => <MaterialIcons name='compare-arrows' size={props.size} color={props.color} /> }}
    />
  </BTCTabs.Navigator>
);

const SettingsStack = createStackNavigator();
const OptionsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{}}>
    <SettingsStack.Screen name='Settings' component={Settings} />
  </SettingsStack.Navigator>
);

const SettingsTabs = createBottomTabNavigator();
const SettingsScreen = () => (
  <SettingsTabs.Navigator>
    <SettingsTabs.Screen
      name='Settings'
      component={OptionsStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name='cog-sharp' size={props.size} color={props.color} />,
      }}
    />
  </SettingsTabs.Navigator>
);

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator drawerType='back'>
    <AppDrawer.Screen name='Bitcoin' component={BTCTabsScreen} />
    <AppDrawer.Screen name='Settings' component={SettingsScreen} />
  </AppDrawer.Navigator>
);

export default () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar animated barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
        <AppDrawerScreen />
      </NavigationContainer>
    </AppearanceProvider>
  );
};
