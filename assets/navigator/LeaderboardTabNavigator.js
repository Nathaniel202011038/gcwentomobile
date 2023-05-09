import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LeaderboardStoryContent from '../screens/home/leaderboard_story_content'
import LeaderboardStoryComment from '../screens/home/leaderboard_story_comment'
import { ROUTES } from '../constants/routes';
import Leaderboard from '../screens/home/leaderboard';

const Stack = createStackNavigator();

function LeaderboardTabNavigator() {

    console.log(Stack);
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
      }}
      initialRouteName={ROUTES.LEADERBOARD}>

        <Stack.Screen name={ROUTES.LEADERBOARD} component={Leaderboard}/>
        <Stack.Screen name={ROUTES.LEADERBOARDSTORYCOMMENT} component={LeaderboardStoryComment}/>
        <Stack.Screen name={ROUTES.LEADERBOARDSTORYCONTENT} component={LeaderboardStoryContent}/>
       
    </Stack.Navigator>


  );
}

export default LeaderboardTabNavigator;
