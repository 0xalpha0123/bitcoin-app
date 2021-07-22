import React, { useContext, useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Title } from 'react-native-paper';

import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <Title style={styles.titleText}>Welcome!</Title>
          <FormInput labelName='Email' value={email} autoCapitalize='none' onChangeText={(userEmail) => setEmail(userEmail)} />
          <FormInput labelName='Password' value={password} secureTextEntry={true} onChangeText={(userPassword) => setPassword(userPassword)} />
          <Button
            text='Login'
            buttonStyle={{ paddingHorizontal: 15, paddingVertidical: 9 }}
            textStyle={{ fontSize: 30 }}
            onPress={() => login(email, password)}
          />
          <Button
            text='Sign up'
            buttonStyle={{ backgroundColor: 'transparent' }}
            textStyle={{ color: '#006ee6' }}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
