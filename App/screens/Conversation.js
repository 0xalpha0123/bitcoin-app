import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Bubble, GiftedChat, Avatar } from 'react-native-gifted-chat';
import { useTheme } from '@react-navigation/native';

import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
  },
});

export default Conversation = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const { channel } = route.params;
  const { colors } = useTheme();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    const startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) => GiftedChat.append(currentMessages, [mapMessage(message)]));
      },
      onTypingStarted: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
        }
      },
      onTypingStopped: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },
    });

    kitty
      .getMessages({
        channel: channel,
      })
      .then((result) => {
        setMessages(result.paginator.items.map(mapMessage));

        setMessagePaginator(result.paginator);
        setLoadEarlier(result.paginator.hasNextPage);

        setLoading(false);
      });

    return startChatSessionResult.session.end;
  }, [user, channel]);

  const handleSend = async (pendingMessages) => {
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
    });
  };

  const handleLoadEarlier = async () => {
    if (!messagePaginator.hasNextPage) {
      setLoadEarlier(false);
      return;
    }

    setIsLoadingEarlier(true);

    const nextPaginator = await messagePaginator.nextPage();

    setMessagePaginator(nextPaginator);

    setMessages((currentMessages) => GiftedChat.prepend(currentMessages, nextPaginator.items.map(mapMessage)));

    setIsLoadingEarlier(false);
  };

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#006ee6',
          },
        }}
      />
    );
  }

  function renderAvatar(props) {
    return (
      <Avatar
        {...props}
        onPressAvatar={(clickedUser) => {
          kitty
            .createChannel({
              type: 'DIRECT',
              members: [{ id: clickedUser._id }],
            })
            .then((result) => {
              navigation.navigate('Conversation', { channel: result.channel });
            });
        }}
      />
    );
  }

  const handleInputChanged = (text) => {
    kitty.sendKeystrokes({
      channel: channel,
      keys: text,
    });
  };

  // const renderFooter = () => {
  //   if (typing) {
  //     return (
  //       <View style={styles.footer}>
  //         <Text style={{ color: colors.text }}>{typing.displayName} is typing...</Text>
  //       </View>
  //     );
  //   }

  //   return null;
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={mapUser(user)}
      renderBubble={renderBubble}
      loadEarlier={loadEarlier}
      isLoadingEarlier={isLoadingEarlier}
      onLoadEarlier={handleLoadEarlier}
      renderAvatar={renderAvatar}
      onInputTextChanged={handleInputChanged}
      isTyping={typing != null}
      // renderFooter={renderFooter}
    />
  );
};

const mapMessage = (message) => ({
  _id: message.id,
  text: message.body,
  createdAt: new Date(message.createdTime),
  user: mapUser(message.user),
});

const mapUser = (user) => ({
  _id: user.id,
  name: user.displayName,
  avatar: user.displayPictureUrl,
});
