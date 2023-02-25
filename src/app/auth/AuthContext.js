import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import _ from '@lodash';
import Utils from '../helpers';
import Actions from '../service';
import SplashScreen from '../main/shared-components/SplashScreen';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);

  const checkUserAuthentication = useCallback(() => {
    const userCredentials = Utils.getLocalStorageItem('user-credentials');
    if (_.isEmpty(userCredentials)) {
      setIsAuthenticated(false);
      setUser(undefined);
      setError(undefined);
      setWaitAuthCheck(false);
      return;
    } else {
      Actions.validateUserCredentials(userCredentials)
        .then((user) => {
          setIsAuthenticated(true);
          setUser(user);
          setError(undefined);
          setWaitAuthCheck(false);
        })
        .catch((error) => {
          setIsAuthenticated(false);
          setUser(undefined);
          setError(error);
          setWaitAuthCheck(false);
        });
    }
  });

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  return waitAuthCheck ? (
    <SplashScreen />
  ) : (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
