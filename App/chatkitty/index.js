import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance('7084c7b5-e5f0-4666-8061-19f5a97524b3');

export const getChannelDisplayName = (channel) => {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
};
