import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/routes';
import AccountDetails from '../screens/home/account_details';
import AccountStoriesTabNavigator from '../navigator/AccountStoriesTabNavigator';
import AccountBookmarksTabNavigator from './AccountBookmarksTabNavigator';
import AccountLandingPage from '../screens/home/account_landing_page';
import Login from '../screens/auth/login';

const Stack = createStackNavigator();

function AccountStackNavigator() {

  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
      }}
      initialRouteName={ROUTES.ACCOUNTLANDINGPAGE}>
        
        <Stack.Screen name={ROUTES.ACCOUNTLANDINGPAGE} component={AccountLandingPage}/>
        <Stack.Screen name={ROUTES.ACCOUNTDETAILS} component={AccountDetails}/>
        <Stack.Screen name={ROUTES.ACCOUNTSTORIESTABNAVIGATOR} component={AccountStoriesTabNavigator}/>
        <Stack.Screen name={ROUTES.ACCOUNTBOOKMARKSTABNAVIGATOR} component={AccountBookmarksTabNavigator}/>

    </Stack.Navigator>


  );
}

export default AccountStackNavigator;
