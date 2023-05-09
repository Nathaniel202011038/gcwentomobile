import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/routes';
import AccountBookmarks from '../screens/home/account_bookmarks';
import AccountBookmarksComments from '../screens/home/account_bookmarks_comments';
import AccountBookmarksContents from '../screens/home/account_bookmarks_contents';

const Stack = createStackNavigator();

function AccountBookmarksTabNavigator() {

    console.log(Stack);
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false,
      }}
      initialRouteName={ROUTES.ACCOUNTBOOKMARKS}>

        <Stack.Screen name={ROUTES.ACCOUNTBOOKMARKS} component={AccountBookmarks}/>
        <Stack.Screen name={ROUTES.ACCOUNTBOOKMARKSCOMMENTS} component={AccountBookmarksComments}/>
        <Stack.Screen name={ROUTES.ACCOUNTBOOKMARKSCONTENTS} component={AccountBookmarksContents}/>
       
    </Stack.Navigator>


  );
}

export default AccountBookmarksTabNavigator;
