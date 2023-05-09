import React, {useState} from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {useFonts} from 'expo-font';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import StoryDetails from '../../components/story_details';

export default function StoryContent(props) {

  const {navigation} = props;
  const [story, setStory] = useState([]);

  let [fontsLoaded] = useFonts({
    'Momcake-Bold': require('../../fonts/Momcake-Bold.otf'),
    'Momcake-Light': require('../../fonts/Momcake-Light.otf'),
    'Emotional': require('../../fonts/Emotional.ttf'),
    'Champ-Bold': require('../../fonts/Champ-Bold.ttf'),
    'Champ-Light': require('../../fonts/Champ-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const StoryList = [
    {
      story_id: 1,
      story_title: 'Harry Potter',
      story_date_value: '04-30-2023',
      story_author: 'diakosianthony',
      story_category: 'Action, Romance',
      story_image : require('../../kalampag_ng_papag.jpg'),
      story_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dodwaddw.'
    },

  ]

  return (
    <ScrollView vertical={true} style={styles.whole_container}>
      <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.LEADERBOARD)}>
        <Icon style={{color: COLORS.purpleColor}}
           name="ios-return-up-back-sharp"
           size={30}
        />
      </TouchableOpacity>

      <StoryDetails data={StoryList} input={story} setInput={setStory}/>

      

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  whole_container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: COLORS.bgColor,
  },

  container: {
    borderRadius: 10,
    paddingBottom: 75,
    paddingHorizontal: 10,
    backgroundColor: COLORS.bgColor,
    minHeight: 680,
    marginBottom: 40,
  },

});

