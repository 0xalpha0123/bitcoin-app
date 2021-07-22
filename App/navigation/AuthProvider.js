import React, { createContext, useState } from 'react';

import { kitty } from '../chatkitty';
import { firebase } from '../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        login: async (email, password) => {
          console.log('email:', email);
          console.log('password:', password);

          setLoading(true);

          const result = await kitty.startSession({
            username: email,
            authParams: {
              password: password,
            },
          });

          setLoading(false);

          if (result.failed) {
            console.log('Failure to login.');
            alert('Fuck, unable to login!');
          }
        },
        register: async (displayName, email, password) => {
          setLoading(true);

          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((credential) => {
                credential.user.updateProfile({ displayName: displayName }).then(async () => {
                  const result = await kitty.startSession({
                    username: email,
                    authParams: {
                      password: password,
                    },
                  });

                  if (result.failed) {
                    console.log('Failure to register.');
                    alert('Fuck, unable to sign up!');
                  }
                });
              });
          } catch (error) {
            console.log(error);
            alert('Son of a bitch! Fix your email.');
          }

          setLoading(false);
        },
        logout: async () => {
          setLoading(true);

          try {
            await kitty.endSession();
          } catch (e) {
            console.error(e);
          }

          setLoading(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
