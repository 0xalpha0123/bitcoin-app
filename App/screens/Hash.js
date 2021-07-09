import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';

import Button from '../components/Button';

const styles = StyleSheet.create({
  hash: {
    margin: 15,
    color: 'red',
  },
  hashContainer: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 20,
    borderRadius: 6,
  },
  header: {
    fontWeight: '500',
    fontSize: 18,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  container: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 6,
  },
  input: {
    backgroundColor: 'white',
    margin: 15,
  },
  button: {},
});

export default () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  // let hash = 'Hash will appear here';
  const { colors } = useTheme();

  const sha256 = () => {
    (async () => {
      setHash(await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, input));
    })();
  };

  return (
    <ScrollView>
      <View>
        <Text style={[styles.header, { color: colors.text }]}>Hash:</Text>

        <View style={styles.hashContainer}>
          <Text style={styles.hash}>{hash}</Text>
        </View>

        <Text style={[styles.header, { color: colors.text }]}>Generate SHA-256 Hash:</Text>

        <View style={styles.container}>
          <TextInput placeholder='Enter any value to hash' style={styles.input} onChangeText={(input) => setInput(input)} value={input} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            text='Hash'
            onPress={() => {
              sha256();
              alert('Hash successful!');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
