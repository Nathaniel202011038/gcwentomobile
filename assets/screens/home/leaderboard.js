import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import LeaderboardStoryList from '../../components/leaderboard_story_list';
import { useFocusEffect } from "@react-navigation/native";

import axios from 'axios';
import { baseUrl } from '../../constants/url';

export default function Home({navigation}) {
  const [story, setStory] = useState('');
  const [storyList, setStoryList] = useState([]);

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


});
