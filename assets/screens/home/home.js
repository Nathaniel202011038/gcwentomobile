import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, ToastAndroid } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import StoryFilter from '../../components/story_filter';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from "@react-navigation/native";

import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl } from '../../constants/url';

export default function Home({navigation}) {
  
  const [story, setStory] = useState('');
  const [selected_category, setSelected_category] = React.useState("");
  const [storyList, setStoryList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const category_picker = ["All", "Action", "Comedy", "Horror", "Mystery", "Romance", "Thriller", "Others"];

  useFocusEffect(
    React.useCallback(() => {
      fetchstories();
      return () => {
        fetchstories();
      };
    }, [])
  );
  
  const fetchstories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getstoryblocks`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No stories available', ToastAndroid.SHORT);
    }
  };

  const fetchActionStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getFilteredStories/Action`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No Action stories available', ToastAndroid.SHORT);
    }
  };

  const fetchComedyStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getFilteredStories/Comedy`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No Comedy stories available', ToastAndroid.SHORT);
    }
  };

  const fetchHorrorStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getFilteredStories/Horror`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No Horror stories available', ToastAndroid.SHORT);
    }
  };

  const fetchMysteryStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getFilteredStories/Mystery`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No Mystery stories available', ToastAndroid.SHORT);
    }
  };

  const fetchRomanceStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getFilteredStories/Romance`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No Romance stories available', ToastAndroid.SHORT);
    }
  };

  const fetchThrillerStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getFilteredStories/Thriller`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No Thriller stories available', ToastAndroid.SHORT);
    }
  };

  const fetchOthersStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getFilteredStories/Others`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No Others stories available', ToastAndroid.SHORT);
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

      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}>
          <Image
            source={{uri: 'https://192.168.100.8/gcwento/assets/GCwento_purple_logo.png'}}
          />
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
              <Text style={styles.bigtext_header}> Published Stories </Text>

              <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 100}}></View>

              <ScrollView horizontal={true} style={styles.filter_container}>
                <TouchableOpacity style={styles.filter_button} onPress={fetchstories}>
                  <Text style={styles.filter_text}> All </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter_button} onPress={fetchActionStories}>
                  <Text style={styles.filter_text}> Action </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter_button} onPress={fetchComedyStories}>
                  <Text style={styles.filter_text}> Comedy </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter_button} onPress={fetchHorrorStories}>
                  <Text style={styles.filter_text}> Horror </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter_button} onPress={fetchMysteryStories}>
                  <Text style={styles.filter_text}> Mystery </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter_button} onPress={fetchRomanceStories}>
                  <Text style={styles.filter_text}> Romance </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter_button} onPress={fetchThrillerStories}>
                  <Text style={styles.filter_text}> Thriller </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter_button} onPress={fetchOthersStories}>
                  <Text style={styles.filter_text}> Others </Text>
                </TouchableOpacity>
              </ScrollView>

          </View>

          <View style={styles.content_row_container}>
            {storyList.length>0 ? <StoryFilter data={storyList} input={story} category={selected_category} navigation={navigation}/> : 
              <View>
                <Text style={{ marginTop: 150, textAlign: 'center', color: COLORS.purpleColor, fontSize: 20, fontFamily: 'Momcake-Bold'}}> No published stories yet </Text>
              </View>
            }
          </View>

          
          
        </ScrollView>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: COLORS.bgColor,
  },

  scrollview_container: {
    width: '100%',
    padding: 20,
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
    backgroundColor: COLORS.darkBgColor,
    elevation: 6, 
  },

  search_input: {
    marginLeft: 10,
    width: '100%',
    color: COLORS.textColor,
    fontSize: 16,
    fontFamily: 'Champ-Bold',
  },

  first_row_container: {
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: COLORS.grayColor,
  },

  second_row_container: {
    marginVertical: 20,
  },

  bigtext_header: {
    fontFamily: 'Emotional',
    fontSize: 25,
    textAlign: 'center',
    color: COLORS.dWhiteColor,
  },

  content_row_container: {
    marginTop: 5,
    minHeight: 900,
    paddingBottom: 30
  },

  filter_container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
  },

  filter_button: {
    borderWidth: 3,
    borderColor: COLORS.purpleColor,
    padding: 10,
    width: 100,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: COLORS.darkBgColor
  },

  filter_text: {
    fontFamily: 'Momcake-Bold',
    color: COLORS.purpleColor,
    fontSize: 17,
    textAlign: 'center'
  }


});




{/* <View style={styles.content_container}>
              <Image
                  style={styles.content_image_container}
                  source={require('../../kalampag_ng_papag.jpg')}
              />
              <View style={styles.content_details_container}>
                <View style={styles.content_title_author_details_container}> 
                  <Text style={styles.content_title}> Kalampag ng Papag </Text>
                  <Text style={styles.content_detail}> AUTHOR: <Text style={styles.content_highlighter}> diakosianthony </Text></Text>
                  <Text style={styles.content_detail}> CATEGORY: <Text style={styles.content_highlighter}> Romance </Text></Text>
                </View>

                <View style={styles.bookmark_container}>

                  <Icon5
                    name="bookmark"
                    size={20}
                    color={COLORS.purpleColor}
                  />

                </View>
              </View>

              <View style={styles.content_buttons_container}>
                <TouchableOpacity style={styles.comments_button}>
                  <Text style={styles.comments_button_text}> COMMENTS </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.read_button}>
                  <Text style={styles.read_button_text}> READ </Text>
                </TouchableOpacity>
              </View>
            </View> */}


            // const StoryList = [
  //   {
  //     id: 1,
  //     story_image_location : require('../../kalampag_ng_papag.jpg'),
  //     story_title: 'Kalampag ng Papag',
  //     story_author: 'diakosianthony',
  //     story_category: 'Romance',
  //     story_star_count: 21,
      
  //   },

  //   {
  //     id: 2,
  //     story_image_location : require('../../orange.jpg'),
  //     story_title: 'Inorbitan ang Orange',
  //     story_author: 'diakosikim',
  //     story_category: 'Action',
  //     story_star_count: 20,
  //   },

  //   {
  //     id: 3,
  //     story_image_location : require('../../kalampag_ng_papag.jpg'),
  //     story_title: 'Girlfriend mo?',
  //     story_author: 'diakosilou',
  //     story_category: 'Thriller',
  //     story_star_count: 18,
  //   },

  //   {
  //     id: 4,
  //     story_image_location : require('../../kalampag_ng_papag.jpg'),
  //     story_title: 'Kalampag ng Papag',
  //     story_author: 'diakosianthony',
  //     story_category: 'Romance',
  //     story_star_count: 21,
      
  //   },

  //   {
  //     id: 5,
  //     story_image_location : require('../../orange.jpg'),
  //     story_title: 'Inorbitan ang Orange',
  //     story_author: 'diakosikim',
  //     story_category: 'Action',
  //     story_star_count: 20,
  //   },

  //   {
  //     id: 6,
  //     story_image_location : require('../../kalampag_ng_papag.jpg'),
  //     story_title: 'Girlfriend mo?',
  //     story_author: 'diakosilou',
  //     story_category: 'Thriller',
  //     story_star_count: 18,
  //   },
  // ]