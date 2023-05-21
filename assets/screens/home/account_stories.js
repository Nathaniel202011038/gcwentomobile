import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountStoriesMadeFilter from '../../components/account_stories_made_filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

import axios from 'axios';
import { baseUrl } from '../../constants/url';

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
    try {
      const response = await axios.get(`${baseUrl}getmystoryblocks/${user_id}`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);

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
        <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.ACCOUNTLANDINGPAGE)}>
          <Icon style={{color: COLORS.purpleColor, marginTop: 10}}
            name="ios-return-up-back-sharp"
            size={30}
          />
        </TouchableOpacity>

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

        <View style={styles.second_row_container}>
          <Text style={styles.bigtext_header}> My Stories </Text>

          <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 110, marginBottom: 20,}}></View>
        </View>

        {storyList.length>0 ? <AccountStoriesMadeFilter data={storyList} input={story} setInput={setStory} navigation={navigation}/> : 
          <View>
            <Text style={{ marginTop: 190, textAlign: 'center', color: COLORS.purpleColor, fontSize: 20, fontFamily: 'Momcake-Bold'}}>You have not created any stories yet </Text>
          </View>
        }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBgColor,
    padding: 20,
    paddingBottom: 1,
  },

  bigtext_header: {
    fontFamily: 'Emotional',
    fontSize: 23,
    textAlign: 'center',
    color: COLORS.dWhiteColor,
  },

  first_row_container: {
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: COLORS.grayColor,
    marginBottom: 15,
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
