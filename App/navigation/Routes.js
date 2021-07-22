import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { kitty } from '../chatkitty';
import Loading from '../components/Loading';

import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import Navigation from './Navigation';

export default Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    return kitty.onCurrentUserChanged((currentUser) => {
      setUser(currentUser);

      if (initializing) {
        setInitializing(false);
      }

      setLoading(false);
    });
  }, [initializing, setUser]);

  if (loading) {
    return <Loading />;
  }

  return <NavigationContainer independent='true'>{user ? <Navigation /> : <AuthStack />}</NavigationContainer>;
};
