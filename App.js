import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {useFonts} from 'expo-font';

import AuthNavigator from './assets/navigator/AuthNavigator';

export default function App() {

  let [fontsLoaded] = useFonts({
    'Momcake-Bold': require('./assets/fonts/Momcake-Bold.otf'),
    'Momcake-Light': require('./assets/fonts/Momcake-Light.otf'),
    'Emotional': require('./assets/fonts/Emotional.ttf'),
    'Champ-Bold': require('./assets/fonts/Champ-Bold.ttf'),
    'Champ-Light': require('./assets/fonts/Champ-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>{
      <AuthNavigator/>

    
    }</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242443',
    alignItems: 'center',
    paddingTop: 40,
  },

});

