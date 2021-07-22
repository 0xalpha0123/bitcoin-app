import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Button from '../components/Button';
import FormInput from '../components/FormInput';

const styles = StyleSheet.create({
  indicator: {
    marginTop: 275,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  date: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [price, setPrice] = useState([]);
  const [input, setInput] = useState('');
  const [sats, setSats] = useState('');
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
      <View style={styles.container}>
        <FormInput labelName='Satoshis' value={Number(sats).toLocaleString()} disabled='true' />

        <FormInput labelName='Enter USD amount to convert' value={input} onChangeText={(input) => setInput(input)} />

        <View>
          <Text style={[styles.date, { color: colors.text }]}>{date}</Text>
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
