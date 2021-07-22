import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { kitty } from '../chatkitty';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 120,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});

export default CreateChannelScreen = ({ navigation }) => {
  const [channelName, setChannelName] = useState('');

  const { colors } = useTheme();

  const handleButtonPress = () => {
    if (channelName.length > 0) {
      kitty
        .createChannel({
          type: 'PUBLIC',
          name: channelName,
        })
        .then(() => navigation.navigate('ConversationList'));
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Title style={[styles.title, { color: colors.text }]}>Add new conversation/group</Title>

        <FormInput labelName='Name' value={channelName} onChangeText={(text) => setChannelName(text)} clearButtonMode='while-editing' />

        <Button text='Add' onPress={() => handleButtonPress()} />
      </View>
    </View>
  );
};
