import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as Crypto from 'expo-crypto';

import Button from '../components/Button';
import FormInput from '../components/FormInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  const sha256 = () => {
    (async () => {
      setHash(await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, input));
      alert('Hash successful!');
    })();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormInput labelName='SHA-256 Hash' value={hash} autoCapitalize='none' disabled='true' multiline={true} denominator={11} />

        <FormInput labelName='Enter any value to hash' value={input} autoCapitalize='none' onChangeText={(input) => setInput(input)} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
          <Button
            text='Hash'
            onPress={() => {
              sha256();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
