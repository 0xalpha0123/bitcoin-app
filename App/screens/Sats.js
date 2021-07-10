import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Button from '../components/Button';

const styles = StyleSheet.create({
  indicator: {
    marginTop: 275,
  },
  sats: {
    margin: 15,
    color: 'red',
  },
  satsContainer: {
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
  date: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {},
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default ({ navigation }) => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [price, setPrice] = useState([]);
  const [input, setInput] = useState('');
  const [sats, setSats] = useState([]);
  const [date, setDate] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    setRefreshCount(0);
    const timeout = setTimeout(() => {
      fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD&include_market_cap=true&include_24hr_change=true&include_last_updated_at=true'
      )
        .then((response) => response.json())
        .then((response) => {
          setPrice(response.bitcoin.usd);
        })
        .catch((error) => {
          console.log(error);
          alert('Sorry, something went wrong.');
        });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [refreshCount]);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshCount(refreshCount + 1);
    console.log('refreshing...');
    convert();
    wait(1000).then(() => setRefreshing(false));
  };

  const convert = () => {
    console.log('the price of btc is...', price);
    setSats(((Number(input) / Number(price)) * 100000000).toFixed(0));
    console.log('sats:', sats);
    setDate('As of ' + Date());
    console.log(date);
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.menuIcon}>
        <AntDesign name='menu-fold' size={24} color='#006ee6' onPress={() => navigation.toggleDrawer()} />
      </View>
      <View style={styles.menu}>
        <Text style={{ color: '#006ee6' }}>Menu</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={[styles.header, { color: colors.text }]}>Satoshis</Text>

        <View style={styles.satsContainer}>
          <Text style={styles.sats}>{Number(`${sats}`).toLocaleString()}</Text>
        </View>

        <Text style={[styles.header, { color: colors.text }]}>USD</Text>

        <View style={styles.container}>
          <TextInput placeholder='Enter cuck bucks to convert to sats' style={styles.input} onChangeText={(input) => setInput(input)} value={input} />
        </View>
        <View>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            text='Convert'
            onPress={() => {
              convert();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
