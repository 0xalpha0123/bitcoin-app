import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { AntDesign } from '@expo/vector-icons';

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
    textAlign: 'center',
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
  menuIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 42,
    marginLeft: 20,
    marginTop: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 15,
    marginTop: 10,
  },
  button: {},
});

export default ({ navigation }) => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const { colors } = useTheme();

  const sha256 = () => {
    (async () => {
      setHash(await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, input));
      alert('Hash successful!');
    })();
  };

  return (
    <ScrollView>
      <View style={styles.menuIcon}>
        <AntDesign name='menu-fold' size={24} color='#006ee6' onPress={() => navigation.toggleDrawer()} />
      </View>
      <View style={styles.menu}>
        <Text style={{ color: '#006ee6' }}>Menu</Text>
      </View>
      <View style={{ marginTop: 30 }}>
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
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
