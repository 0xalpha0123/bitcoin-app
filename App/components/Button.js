import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const Button = ({ text, onPress, buttonStyle = {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#4d4d4e',
        margin: 15,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        ...buttonStyle,
      }}
    >
      <Text style={{ color: 'white', fontSize: 24 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
