import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            color: colors.text,
          }}
        >
          HODLing has always been the only option
        </Text>
      </View>
    </SafeAreaView>
  );
};
