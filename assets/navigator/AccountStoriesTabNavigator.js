import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/routes';
import AccountStories from '../screens/home/account_stories';
import AccountStoriesComments from '../screens/home/account_stories_comments';
import AccountStoriesEdit from '../screens/home/account_stories_edit';



const Stack = createStackNavigator();

function LeaderboardTabNavigator() {

    console.log(Stack);
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false,
      }}
      initialRouteName={ROUTES.ACCOUNTSTORIES}>

        <Stack.Screen name={ROUTES.ACCOUNTSTORIES} component={AccountStories}/>
        <Stack.Screen name={ROUTES.ACCOUNTSTORIESCOMMENTS} component={AccountStoriesComments}/>
        <Stack.Screen name={ROUTES.ACCOUNTSTORIESEDIT} component={AccountStoriesEdit}/>
       
    </Stack.Navigator>


  );
}

export default LeaderboardTabNavigator;
