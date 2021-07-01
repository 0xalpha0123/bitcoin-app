import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  indicator: {
    marginTop: 275,
  },
  container: {
    marginTop: 25,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#4d4d4e',
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 50,
    width: 225,
    height: 225,
  },
  header: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
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

export default ({ navigation }) => {
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
    }, 1000);

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <StatusBar barStyle='dark-content' />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.push('Options')}>
            <Entypo name='cog' size={32} color={colors.text} />
          </TouchableOpacity>
        </View>
        {loading && indicatorCount < 1 ? (
          <ActivityIndicator size='large' style={styles.indicator} />
        ) : (
          <>
            <View>
              <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Text style={{ color: '#6e7070', textAlign: 'center' }}>
                  Pull down to refresh
                </Text>
                <View style={{ alignSelf: 'center' }}>
                  <Entypo name='chevron-down' size={22} color='#6e7070' />
                </View>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/bitcoin-btc-logo.png')}
              style={styles.logo}
              resize='contain'
            />
            <View style={styles.container}>
              <View style={styles.row}>
                <Text style={[styles.colLeft, { color: colors.text }]}>Price:</Text>
                <Text style={[styles.colLeft, { color: colors.text }]}>
                  {'$ ' + Number(`${data.bitcoin.usd}`).toLocaleString()}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.colLeft, { color: colors.text }]}>Market Cap:</Text>
                <Text style={[styles.colLeft, { color: colors.text }]}>
                  {'$ ' +
                    `${data.bitcoin.usd_market_cap}`.substring(0, 3) +
                    '.' +
                    `${data.bitcoin.usd_market_cap}`.substring(3, 5) +
                    ' B'}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.colLeft, { color: colors.text }]}>24h Change:</Text>
                <Text style={[styles.colLeft, { color: colors.text }]}>
                  {Number(`${data.bitcoin.usd_24h_change}`).toFixed(2) + '%'}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.colLeft, { color: colors.text }]}>
                  Block Height:
                </Text>
                <Text style={[styles.colLeft, { color: colors.text }]}>
                  {Number(`${blockHeight}`).toLocaleString()}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.colLeft, { color: colors.text }]}>Mempool TXs:</Text>
                <Text style={[styles.colLeft, { color: colors.text }]}>
                  {Number(`${unconfirmed}`).toLocaleString()}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.colLeft, { color: colors.text }]}>Hash Rate:</Text>
                <Text style={[styles.colLeft, { color: colors.text }]}>
                  {Number(`${hashRate}` / Math.pow(1000, 3)).toFixed(2) + ' EH/s'}
                </Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  title='Donate'
                  onPress={() =>
                    openUrl(
                      'https://checkout.opennode.com/p/dd107892-4b16-4d67-8240-8c47fb03462a'
                    )
                  }
                  style={styles.button}
                >
                  <Text style={{ fontSize: 24, color: 'white' }}>OpenNode</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ color: '#6e7070', textAlign: 'center' }}>
                  Try out OpenNode BTC payment processor
                </Text>
                <Text style={{ color: '#6e7070', textAlign: 'center' }}>
                  by zapping me some sats via Lightning!
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
