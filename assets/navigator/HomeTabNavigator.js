import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoryContent from '../screens/home/story_content';
import Home from '../screens/home/home';
import { ROUTES } from '../constants/routes';
import StoryComment from '../screens/home/story_comment';

const Stack = createStackNavigator();

function HomeTabNavigator() {

  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
      }}
      initialRouteName={ROUTES.HOME}>

        <Stack.Screen name={ROUTES.HOME} component={Home}/>
        <Stack.Screen name={ROUTES.STORYCONTENT} component={StoryContent}/>
        <Stack.Screen name={ROUTES.STORYCOMMENT} component={StoryComment}/>

    </Stack.Navigator>
  );
}

export default HomeTabNavigator;
