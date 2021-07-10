import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  menuIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 42,
    marginLeft: 20,
    marginTop: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 15,
    marginTop: 10,
  },
});

export default ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <View style={styles.menuIcon}>
        <AntDesign name='menu-fold' size={24} color='#006ee6' onPress={() => navigation.toggleDrawer()} />
      </View>
      <View style={styles.menu}>
        <Text style={{ color: '#006ee6' }}>Menu</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 100 }}>
        <Text
          style={{
            color: colors.text,
          }}
        >
          HODLing has always been the only option
        </Text>
      </View>
    </SafeAreaView>
  );
};
