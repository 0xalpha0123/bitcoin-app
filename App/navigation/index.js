import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { InAppNotificationProvider } from '@chatkitty/react-native-in-app-notification';

import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#006ee6',
    accent: '#006ee6',
    background: '#f7f9fb',
  },
};

export default Providers = () => (
  <PaperProvider theme={theme}>
    <AuthProvider>
      <InAppNotificationProvider>
        <Routes />
      </InAppNotificationProvider>
    </AuthProvider>
  </PaperProvider>
);
