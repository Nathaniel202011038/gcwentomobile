import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import LeaderboardStoryList from '../../components/leaderboard_story_list';
import { useFocusEffect } from "@react-navigation/native";

import axios from 'axios';
import { baseUrl } from '../../constants/url';

export default function Home({navigation}) {
  const [story, setStory] = useState('');
  const [storyList, setStoryList] = useState([]);
  const noAvail = 'No Leaderboard for this category yet';

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
      const response = await axios.get(`${baseUrl}getleaderboards`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };

  const fetchActionStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getLeaderboardFilteredStories/Action`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show(noAvail, ToastAndroid.SHORT);
    }
  };

  const fetchComedyStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getLeaderboardFilteredStories/Comedy`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show(noAvail, ToastAndroid.SHORT);
    }
  };

  const fetchHorrorStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getLeaderboardFilteredStories/Horror`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show(noAvail, ToastAndroid.SHORT);
    }
  };

  const fetchMysteryStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getLeaderboardFilteredStories/Mystery`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show(noAvail, ToastAndroid.SHORT);
    }
  };

  const fetchRomanceStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getLeaderboardFilteredStories/Romance`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show(noAvail, ToastAndroid.SHORT);
    }
  };

  const fetchThrillerStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getLeaderboardFilteredStories/Thriller`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show(noAvail, ToastAndroid.SHORT);
    }
  };

  const fetchOthersStories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getLeaderboardFilteredStories/Others`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStoryList(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show(noAvail, ToastAndroid.SHORT);
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
      
          <View style={styles.second_row_container}>
              <Text style={styles.bigtext_header}> Leaderboard </Text>

              <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 100}}></View>
          </View>

          <Text style={{fontFamily: 'Champ-Bold', color: COLORS.purpleColor, fontSize: 16, marginTop: 13}}> Filter by Category </Text>
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

          <View style={styles.content_row_container}>
            <LeaderboardStoryList data={storyList} input={story} navigation={navigation}/>
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

  bigtext_header: {
    fontFamily: 'Emotional',
    fontSize: 25,
    textAlign: 'center',
    color: COLORS.dWhiteColor,
  },

  content_row_container: {
    marginTop: 20,
    minHeight: 900,
    paddingBottom: 30
  },

  filter_container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
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
