import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';
import AccountDetails from '../screens/home/account_details';
import { useFonts } from 'expo-font';
import AccountStoriesTabNavigator from './AccountStoriesTabNavigator';
import AccountBookmarksTabNavigator from './AccountBookmarksTabNavigator';

const Tab = createMaterialTopTabNavigator();

function AccountBookmarkItemNavigator() {

  let [fontsLoaded] = useFonts({
    'Momcake-Bold': require('../fonts/Momcake-Bold.otf'),
    'Momcake-Light': require('../fonts/Momcake-Light.otf'),
    'Emotional': require('../fonts/Emotional.ttf'),
    'Champ-Bold': require('../fonts/Champ-Bold.ttf'),
    'Champ-Light': require('../fonts/Champ-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tab.Navigator

      screenOptions={{
        inactiveTintColor: COLORS.textColor,
        width: Dimensions.get('window').height,
        tabBarLabelStyle: { 
          fontSize: 18,
          fontFamily: 'Momcake-Bold',
        },
        tabBarStyle: { 
          backgroundColor: COLORS.darkerBgColor,
          fontFamily: 'Momcake-Bold',
         },
      }}
    >
      <Tab.Screen name={ROUTES.ACCOUNTDETAILS} component={AccountDetails} 
        options={{
          title: 'DETAILS',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dWhiteColor,
        }}
      />
      <Tab.Screen name={ROUTES.ACCOUNTSTORIESTABNAVIGATOR} component={AccountStoriesTabNavigator} 
        options={{
          title: 'STORIES',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dWhiteColor,
        }}
      />
      <Tab.Screen name={ROUTES.ACCOUNTBOOKMARKSTABNAVIGATOR} component={AccountBookmarksTabNavigator} 
        options={{
        title: 'BOOKMARKS',
        headerShown: false,
        tabBarActiveTintColor: COLORS.dWhiteColor,
        }}
      />
    </Tab.Navigator>
  );
}


export default AccountTopTabNavigator;