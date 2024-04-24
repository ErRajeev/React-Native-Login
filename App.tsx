import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './app/screen/Login';
import Home from './app/screen/Home';
import {User, onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from './FirebaseConfig';

function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      console.log('User', user);
      setUser(user);
    });
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
