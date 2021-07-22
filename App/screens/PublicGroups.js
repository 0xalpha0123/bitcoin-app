import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { kitty } from '../chatkitty';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});

export default BrowseGroups = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();

  const isFocused = useIsFocused();

  useEffect(() => {
    kitty.getChannels({ filter: { joined: false } }).then((result) => {
      setChannels(result.paginator.items);

      if (loading) {
        setLoading(false);
      }
    });
  }, [isFocused, loading]);

  async function handleJoinChannel(channel) {
    const result = await kitty.joinChannel({ channel: channel });

    navigation.navigate('Conversation', { channel: result.channel });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.type}
            titleNumberOfLines={1}
            titleStyle={[styles.listTitle, { color: colors.text }]}
            descriptionStyle={styles.listDescription}
            descriptionNumberOfLines={1}
            onPress={() => handleJoinChannel(item)}
          />
        )}
      />
    </View>
  );
};
