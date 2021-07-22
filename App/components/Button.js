import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const Button = ({ text, onPress, buttonStyle, textStyle = {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#006ee6',
        margin: 15,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        ...buttonStyle,
      }}
    >
      <Text style={{ color: 'white', fontSize: 24, ...textStyle }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
