import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/routes';
import SearchAuthor from '../screens/home/search_author';
import SearchAuthorProfile from '../screens/home/search_author_profile';
import SearchAuthorProfileStoryContents from '../screens/home/search_author_profile_story_contents';
import SearchAuthorProfileStoryComments from '../screens/home/search_author_profile_story_comments';



const Stack = createStackNavigator();

function SearchAuthorNavigator() {

  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false,
      }}
      initialRouteName={ROUTES.SEARCHAUTHOR}>

        <Stack.Screen name={ROUTES.SEARCHAUTHOR} component={SearchAuthor}/>
        <Stack.Screen name={ROUTES.SEARCHAUTHORPROFILE} component={SearchAuthorProfile}/>
        <Stack.Screen name={ROUTES.SEARCHAUTHORPROFILESTORYCONTENTS} component={SearchAuthorProfileStoryContents}/>
        <Stack.Screen name={ROUTES.SEARCHAUTHORPROFILESTORYCOMMENTS} component={SearchAuthorProfileStoryComments}/>

    </Stack.Navigator>


  );
}

export default SearchAuthorNavigator;
