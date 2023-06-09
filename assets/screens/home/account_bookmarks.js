import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import BookmarksFilter from '../../components/bookmarks_filter';

export default function AccounBookmarks({navigation}) {

  const [story, setStory] = useState('');

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
      id: 1,
      story_image_location : require('../../kalampag_ng_papag.jpg'),
      story_title: 'Bookmarks',
      story_author: 'diakosianthony',
      story_category: 'Romance',
      story_star_count: 21,
    },

    {
      id: 2,
      story_image_location : require('../../orange.jpg'),
      story_title: 'Inorbitan ang Orange',
      story_author: 'diakosikim',
      story_category: 'Action',
      story_star_count: 20,
    },
  ]

  return (
    <View style={styles.container}>
      <ScrollView vertical={true} style={styles.scrollview_container}>
        <View style={styles.first_row_container}>
          <Text style={styles.label}> Search </Text>
          <View style={styles.text_input_container}>
            <Icon5
              name="search"
              size={20}
              color={COLORS.purpleColor}
            />
            <TextInput style={styles.search_input}
            placeholder="Search story title here..." placeholderTextColor="#E5E5E5" value={story} onChangeText={text=>setStory(text)}/>
          </View>
        </View>
        <BookmarksFilter data={StoryList} input={story} setInput={setStory} navigation={navigation}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBgColor,
    padding: 20,
  },

  first_row_container: {
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: COLORS.grayColor,
    marginBottom: 30,
  },

  label: {
    fontFamily: 'Champ-Bold',
    color: COLORS.purpleColor,
    fontSize: 16,
  },

  text_input_container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.darkerBgColor,
    marginVertical: 10,
    padding: 15,
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: COLORS.bgColor,
    elevation: 6, 
  },

  search_input: {
    marginLeft: 10,
    width: '100%',
    color: COLORS.textColor,
    fontSize: 16,
    fontFamily: 'Champ-Bold',

  },

  

});