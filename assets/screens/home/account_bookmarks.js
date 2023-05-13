import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import BookmarksFilter from '../../components/bookmarks_filter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const baseUrl = 'http://192.168.100.8/gcwento/restAPI/';

const AccountBookmarks = ({navigation}) => { 

  const [story, setStory] = useState('');
  const [bookmarkedStory, setBookmarkedStory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarked();
      return () => {
        fetchBookmarked();
      };
    }, [])
  );

  const fetchBookmarked = async () => {
    user_id = await AsyncStorage.getItem("userId");
    
    try {
      const response = await axios.get(`${baseUrl}getBookmarkedStory/${user_id}`, {
        
      });
      if (response.status === 200 || refreshing === true) {
        // alert(response.data.payload[0].cooking_time);
        // console.log(response.data.payload[0]);
        setBookmarkedStory(response.data.payload);
        console.log(response.data);

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };

  // const onRefresh = useCallback(() => {
  //   fetchstories();
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 500);
  // }, []);

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

        {/* <TouchableOpacity onPress={fetchBookmarkedStories}> 
          <Text>Try</Text> 
        </TouchableOpacity> */}

        <BookmarksFilter data={bookmarkedStory} input={story} setInput={setStory} navigation={navigation}/>
      </ScrollView>
    </View>
  )
}

export default AccountBookmarks;

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