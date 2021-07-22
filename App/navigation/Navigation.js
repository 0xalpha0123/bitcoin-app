import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';
import { kitty, getChannelDisplayName } from '../chatkitty';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Home from '../screens/Home';
import Hash from '../screens/Hash';
import Sats from '../screens/Sats';

import Settings from '../screens/Settings';

import ConversationList from '../screens/ConversationList';
import NewConversation from '../screens/NewConversation';
import Conversation from '../screens/Conversation';
import PublicGroups from '../screens/PublicGroups';

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

const BitcoinStack = createStackNavigator();
const BitcoinStackScreen = () => (
  <BitcoinStack.Navigator screenOptions={{}}>
    <BitcoinStack.Screen
      name='Bitcoin'
      component={Home}
      options={({ navigation }) => ({
        headerLeft: () => <IconButton icon='menu' size={28} color='#006ee6' onPress={() => navigation.toggleDrawer()} />,
      })}
    />
  </BitcoinStack.Navigator>
);

const HashStack = createStackNavigator();
const HashStackScreen = () => (
  <HashStack.Navigator screenOptions={{}}>
    <HashStack.Screen
      name='SHA-256'
      component={Hash}
      options={({ navigation }) => ({
        headerLeft: () => <IconButton icon='menu' size={28} color='#006ee6' onPress={() => navigation.toggleDrawer()} />,
      })}
    />
  </HashStack.Navigator>
);

const SatsStack = createStackNavigator();
const SatsStackScreen = () => (
  <SatsStack.Navigator>
    <SatsStack.Screen
      name='Sats'
      component={Sats}
      options={({ navigation }) => ({
        headerLeft: () => <IconButton icon='menu' size={28} color='#006ee6' onPress={() => navigation.toggleDrawer()} />,
      })}
    />
  </SatsStack.Navigator>
);

const MessageStack = createStackNavigator();

const MessageComponent = ({ navigation, showNotification }) => {
  useEffect(() => {
    console.log('memory leak found?');

    return kitty.onNotificationReceived((notification) => {
      showNotification({
        title: notification.title,
        message: notification.body,
        onPress: () => {
          switch (notification.data.type) {
            case 'USER:SENT:MESSAGE':
            case 'SYSTEM:SENT:MESSAGE':
              kitty.getChannel(notification.data.channelId).then((result) => {
                navigation.jumpTo('Messages');
                navigation.navigate('Conversation', { channel: result.channel });
              });
              break;
          }
        },
      });
    });
  }, [navigation, showNotification]);

  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name='ConversationList'
        component={ConversationList}
        options={(options) => ({
          headerRight: () => <IconButton icon='plus' size={28} color='#006ee6' onPress={() => options.navigation.navigate('PublicGroups')} />,
          headerLeft: () => <IconButton icon='menu' size={28} color='#006ee6' onPress={() => options.navigation.toggleDrawer()} />,
          headerTitle: 'Messages',
        })}
      />

      <MessageStack.Screen
        name='PublicGroups'
        component={PublicGroups}
        options={(options) => ({
          headerRight: () => <IconButton icon='plus' size={28} color='#006ee6' onPress={() => options.navigation.navigate('NewConversation')} />,
          headerTitle: 'Public Group Chats',
        })}
      />

      <MessageStack.Screen
        name='Conversation'
        component={Conversation}
        options={({ route }) => ({
          title: getChannelDisplayName(route.params.channel),
        })}
      />

      <MessageStack.Screen
        name='NewConversation'
        component={NewConversation}
        options={{
          headerTitle: 'New Conversation/Group',
        }}
      />
    </MessageStack.Navigator>
  );
};

const registerForPushNotificationsAsync = async () => {
  let token;

  if (Constants.isDevice && Platform.OS !== 'web') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{}}>
    <SettingsStack.Screen
      name='Settings'
      component={Settings}
      options={({ navigation }) => ({
        headerLeft: () => <IconButton icon='menu' size={28} color='#006ee6' onPress={() => navigation.toggleDrawer()} />,
      })}
    />
  </SettingsStack.Navigator>
);

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator drawerType='back'>
    <AppDrawer.Screen name='Bitcoin' component={BTCTabsScreen} />
    <AppDrawer.Screen name='Messages' component={withInAppNotification(MessageComponent)} />
    <AppDrawer.Screen name='Settings' component={SettingsStackScreen} />
  </AppDrawer.Navigator>
);

export default () => {
  const scheme = useColorScheme();

  useEffect(() => {
    console.log('memory leak found (registerFor) ?');

    registerForPushNotificationsAsync().then((token) => {
      kitty.updateCurrentUser((user) => {
        user.properties = {
          ...user.properties,
          'expo-push-token': token,
        };

        console.log('expo token:', token);
        console.log('memory leak found?');
        return user;
      });
    });
  }, []);

  return (
    <AppearanceProvider>
      <NavigationContainer independent='true' theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar animated barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
        <AppDrawerScreen />
      </NavigationContainer>
    </AppearanceProvider>
  );
};
