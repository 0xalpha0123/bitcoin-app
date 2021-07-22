import React, { useContext, useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import * as Crypto from 'expo-crypto';

import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});

export default SignupScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <Title style={styles.titleText}>Let's get started!</Title>

          <FormInput
            labelName='Display Name'
            value={displayName}
            autoCapitalize='none'
            placeholder='The name other users will see'
            onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
          />

          <FormInput labelName='Email' value={email} autoCapitalize='none' onChangeText={(userEmail) => setEmail(userEmail)} />

          <FormInput
            labelName='Password'
            value={password}
            secureTextEntry={true}
            placeholder='6 characters minimum'
            onChangeText={(userPassword) => setPassword(userPassword)}
          />

          <Button text='Sign up' onPress={() => register(displayName, email, password)} />

          <IconButton icon='keyboard-backspace' size={30} style={styles.navButton} color='#006ee6' onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
