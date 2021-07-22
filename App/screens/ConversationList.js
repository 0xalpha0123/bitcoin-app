import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, List, Button, Dialog, Portal } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { kitty, getChannelDisplayName } from '../chatkitty';
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

export default HomeScreen = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaveChannel, setLeaveChannel] = useState(null);

  const { colors } = useTheme();

  const isFocused = useIsFocused();

  useEffect(() => {
    let isCancelled = false;

    kitty.getChannels({ filter: { joined: true } }).then((result) => {
      if (!isCancelled) {
        setChannels(result.paginator.items);

        if (loading) {
          setLoading(false);
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isFocused, loading]);

  const handleLeaveChannel = () => {
    kitty.leaveChannel({ channel: leaveChannel }).then(() => {
      setLeaveChannel(null);

      kitty.getChannels({ filter: { joined: true } }).then((result) => {
        setChannels(result.paginator.items);
      });
    });
  };

  const handleDismissLeaveChannel = () => {
    setLeaveChannel(null);
  };

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
            title={getChannelDisplayName(item)}
            description={item.type}
            titleNumberOfLines={1}
            titleStyle={[styles.listTitle, { color: colors.text }]}
            descriptionStyle={[styles.listDescription, { color: colors.text }]}
            descriptionNumberOfLines={1}
            onPress={() => navigation.navigate('Conversation', { channel: item })}
            onLongPress={() => {
              setLeaveChannel(item);
            }}
          />
        )}
      />
      <Portal>
        <Dialog visible={leaveChannel} onDismiss={handleDismissLeaveChannel}>
          <Dialog.Title>Leave channel?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={handleDismissLeaveChannel}>Cancel</Button>
            <Button onPress={handleLeaveChannel}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
