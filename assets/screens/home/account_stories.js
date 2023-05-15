import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import AccountStoriesMadeFilter from '../../components/account_stories_made_filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

import axios from 'axios';
const baseUrl = 'http://192.168.100.8/gcwento/restAPI/';

export default function AccountStories({navigation}) {

  const [story, setStory] = useState('');
  const [storyList, setStoryList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
 

  AsyncStorage.getItem("userId");

  useFocusEffect(
    React.useCallback(() => {
      fetchmystories();
      return () => {
        fetchmystories();
      };
    }, [])
  );

  const fetchmystories = async () => {
    user_id = await AsyncStorage.getItem("userId");
    console.log(user_id);
    try {
      const response = await axios.get(`${baseUrl}getmystoryblocks/${user_id}`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
        console.log(response.data.payload)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };


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
        <AccountStoriesMadeFilter data={storyList} input={story} setInput={setStory} navigation={navigation}/>
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

  scrollview_container: {
    flex: 1,
    width: '100%'
  }

  

});




// const StoryList = [
  //   {
  //     id: 1,
  //     story_image_location : require('../../sunset.jpg'),
  //     story_title: 'Ginawa kong story',
  //     story_author: 'akotosinathoy',
  //     story_category: 'Romance',
  //     story_star_count: 21,
  //   },

  //   {
  //     id: 2,
  //     story_image_location : require('../../nature.jpg'),
  //     story_title: 'Nature',
  //     story_author: 'akotosinathoy',
  //     story_category: 'Action',
  //     story_star_count: 18,
  //   },

  //   {
  //     id: 3,
  //     story_image_location : require('../../nature.jpg'),
  //     story_title: 'Nature',
  //     story_author: 'akotosinathoy',
  //     story_category: 'Action',
  //     story_star_count: 18,
  //   },

  // ]
