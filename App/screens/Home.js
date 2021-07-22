import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, RefreshControl, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 5,
  },
  colLeft: {
    fontSize: 20,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
    width: 215,
    height: 215,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 42,
    marginTop: 10,
  },
  iconText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 6,
  },
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const openUrl = (url) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert('Invalid URL');
  });
};

export default () => {
  const [indicatorCount, setIndicatorCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockHeight, setBlockHeight] = useState([]);
  const [unconfirmed, setUnconfirmed] = useState([]);
  const [hashRate, setHashRate] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    setRefreshCount(0);
    setLoading(true);
    const timeout = setTimeout(() => {
      fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD&include_market_cap=true&include_24hr_change=true&include_last_updated_at=true'
      )
        .then((response) => response.json())
        .then((response) => {
          console.log('Price, Market Cap, and 24h % change', response);
          setData(response);
        })
        .catch((error) => {
          console.log(error);
          alert('Sorry, something went wrong.');
        })
        .finally(() => {
          setLoading(false);
        });
      fetch('https://blockchain.info/q/getblockcount')
        .then((response) => response.json())
        .then((response) => {
          console.log('Block Height', response);
          setBlockHeight(response);
        })
        .catch((error) => {
          console.log(error);
          alert('Sorry, something went wrong.');
        });
      fetch('https://blockchain.info/q/unconfirmedcount')
        .then((response) => response.json())
        .then((response) => {
          console.log('Unconfirmed tx', response);
          setUnconfirmed(response);
        })
        .catch((error) => {
          console.log(error);
          alert('Sorry, something went wrong.');
        });
      fetch('https://blockchain.info/q/hashrate')
        .then((response) => response.json())
        .then((response) => {
          console.log('Hash Rate (gigahashes)', response);
          setHashRate(response);
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
    setIndicatorCount(1);
    console.log('refreshing...');
    wait(1000).then(() => setRefreshing(false));
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {loading && indicatorCount < 1 ? (
        <ActivityIndicator color='transparent' />
      ) : (
        <>
          <View style={styles.iconRow}>
            <MaterialIcons name='network-check' size={28} color='#006ee6' onPress={() => openUrl('https://txstreet.com/v/btc')} />
          </View>
          <View style={styles.iconText}>
            <Text style={{ color: '#006ee6' }}>Blockchain</Text>
          </View>
          <View>
            <Image source={require('../assets/bitcoin-btc-logo.png')} style={styles.logo} resize='contain' />
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={[styles.colLeft, { color: colors.text }]}>Price:</Text>
              <Text style={[styles.colLeft, { color: colors.text }]}>{'$ ' + Number(`${data.bitcoin.usd}`).toLocaleString()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.colLeft, { color: colors.text }]}>Market Cap:</Text>
              <Text style={[styles.colLeft, { color: colors.text }]}>
                {'$ ' + `${data.bitcoin.usd_market_cap}`.substring(0, 3) + '.' + `${data.bitcoin.usd_market_cap}`.substring(3, 5) + ' B'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.colLeft, { color: colors.text }]}>24h Change:</Text>
              <Text style={[styles.colLeft, { color: colors.text }]}>{Number(`${data.bitcoin.usd_24h_change}`).toFixed(2) + '%'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.colLeft, { color: colors.text }]}>Block Height:</Text>
              <Text style={[styles.colLeft, { color: colors.text }]}>{Number(`${blockHeight}`).toLocaleString()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.colLeft, { color: colors.text }]}>Mempool TXs:</Text>
              <Text style={[styles.colLeft, { color: colors.text }]}>{Number(`${unconfirmed}`).toLocaleString()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.colLeft, { color: colors.text }]}>Hash Rate:</Text>
              <Text style={[styles.colLeft, { color: colors.text }]}>{Number(`${hashRate}` / Math.pow(1000, 3)).toFixed(2) + 'M' + ' TH/s'}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <Button
                text='OpenNode'
                onPress={() => openUrl('https://checkout.opennode.com/p/dd107892-4b16-4d67-8240-8c47fb03462a')}
                style={styles.button}
              />
            </View>
            <View>
              <Text style={{ color: '#6e7070', textAlign: 'center' }}>Try out OpenNode BTC payment processor</Text>
              <Text style={{ color: '#6e7070', textAlign: 'center' }}>by zapping me some sats via Lightning!</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};
