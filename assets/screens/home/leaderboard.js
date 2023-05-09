import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import { SelectList } from 'react-native-dropdown-select-list';
import LeaderboardStoryList from '../../components/leaderboard_story_list';

export default function Home({navigation}) {
  const [story, setStory] = useState('');

  const [selected_category, setSelected_category] = React.useState("");
  
  const category_data = [
      {key:'1', value:'All'},
      {key:'2', value:'Action'},
      {key:'3', value:'Comedy'},
      {key:'4', value:'Horror'},
      {key:'5', value:'Mystery'},
      {key:'6', value:'Romance'},
      {key:'7', value:'Thriller'},  
      {key:'8', value:'Others'},  
  ]

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
      story_title: 'Kalampag ng Papag',
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

    {
      id: 3,
      story_image_location : require('../../kalampag_ng_papag.jpg'),
      story_title: 'Girlfriend mo?',
      story_author: 'diakosilou',
      story_category: 'Thriller',
      story_star_count: 18,
    },

  ]

  return (

      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}>
      
          <View style={styles.second_row_container}>
              <Text style={styles.bigtext_header}> Leaderboard </Text>

              <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 100}}></View>

              <SelectList style={styles.category_drop_down} 
                placeholder="Select Category"
                boxStyles={{backgroundColor: 'white', width: '55%', borderRadius: 60, paddingHorizontal: 30, marginTop: 20, elevation: 6}} 
                inputStyles={{fontSize: 16, fontFamily: 'Champ-Bold'}}
                dropdownStyles={{backgroundColor: 'white', width: '55%', paddingLeft: 30}}
                dropdownItemStyles={{textAlign: 'center', fontSize: 16, fontFamily: 'Champ-Bold'}}

                data={category_data} setSelected={setSelected_category}
              />
          </View>



          <View style={styles.content_row_container}>
            <LeaderboardStoryList data={StoryList} input={story} setInput={setStory} navigation={navigation}/>
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
