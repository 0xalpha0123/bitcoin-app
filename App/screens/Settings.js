import React, { useContext } from 'react';
import { View, SafeAreaView } from 'react-native';

import Button from '../components/Button';
import { AuthContext } from '../navigation/AuthProvider';

export default () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', marginTop: 60 }}>
        <Button text='Logout' onPress={() => logout()} />
      </View>
    </SafeAreaView>
  );
};
