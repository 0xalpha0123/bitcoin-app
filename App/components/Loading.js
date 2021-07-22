import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='#006ee6' />
    </View>
  );
};

export default Loading;
