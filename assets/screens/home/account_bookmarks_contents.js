import React, {useState} from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Image  } from 'react-native';
import {useFonts} from 'expo-font';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconfa from 'react-native-vector-icons/FontAwesome';

import { img_url } from '../../constants/url';

export default function AccountBookmarksContents({navigation, route}) {

  const storyContent = route.params;
  const [story, setStory] = useState([]);
  const [newFontSize, setFontSize] = useState(16); // Default font size

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
      story_title: 'Bookmarks',
      story_date_value: '04-30-2023',
      story_author: 'diakosianthony',
      story_category: 'Action, Romance',
      story_image : require('../../kalampag_ng_papag.jpg'),
      story_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dodwaddw.'
    },

  ]

  const increaseFontSize = () => {
    setFontSize(newFontSize + 2); // Increase font size by 2
  };

  const decreaseFontSize = () => {
    setFontSize(newFontSize - 2); // Decrease font size by 2
  };

  return (
    <ScrollView vertical={true} style={styles.whole_container}>
      <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.ACCOUNTBOOKMARKS)}>
        <Icon style={{color: COLORS.purpleColor, marginTop: 20}}
           name="ios-return-up-back-sharp"
           size={30}
        />
      </TouchableOpacity>

      <View style={styles.story_whole_content_container}> 
        <View style={styles.story_title_container}>
            <Text style={styles.bigtext_header}> {storyContent.story_title} </Text>
            <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 100}}></View>
        </View>
        <View style={styles.story_content_container}>
            <View style={styles.story_date_container}>
                <Icon style={{color: COLORS.grayColor}}
                    name="calendar"
                    size={15}
                />
                <Text style={styles.story_date_value}>{storyContent.created_at}</Text>
            </View>

            <View style={styles.story_brief_details}>
                <Text style={styles.story_detail}>AUTHOR: <Text style={styles.story_detail_value}>{storyContent.user_penname}</Text></Text>
                <Text style={styles.story_detail}>CATEGORY: <Text style={styles.story_detail_value}>{storyContent.story_category}</Text></Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={increaseFontSize} style={{backgroundColor: COLORS.purpleColor, paddingVertical: 10, paddingHorizontal:20, borderTopLeftRadius: 30, borderBottomLeftRadius:30}}>
                <Iconfa style={{color: COLORS.darkerBgColor}}
                  name="search-plus"
                  size={20}
                />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={decreaseFontSize} style={{backgroundColor: COLORS.darkerBgColor, paddingVertical: 10, paddingHorizontal:20, borderTopRightRadius: 30, borderBottomRightRadius:30, marginLeft: 5}}>
                <Iconfa style={{color: COLORS.purpleColor}}
                  name="search-minus"
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <Image
                style={styles.story_image}
                source={{uri: img_url+storyContent.story_dp}}
            />

<Text style={{fontFamily: 'Champ-Bold', fontSize: newFontSize, color: COLORS.textColor, textAlign: 'justify',}}>{storyContent.story_content}</Text>       
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
whole_container: {
  flex: 1,
  paddingTop: 10,
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

content_container: {
  backgroundColor: COLORS.darkBgColor,
  borderRadius: 7,
  paddingVertical: 10,
  paddingHorizontal: 15,
  paddingBottom: 13,
  marginBottom: 7,
  elevation: 6, 
},

bigtext_header: {
  fontFamily: 'Emotional',
  fontSize: 25,
  textAlign: 'center',
  color: COLORS.dWhiteColor,
},

story_detail: {
  fontFamily: 'Momcake-Bold',
  color: COLORS.dWhiteColor,
  fontSize: 15,
},

story_content_container: {
  borderRadius: 10,
  paddingTop: 15,
  paddingHorizontal: 15,
  backgroundColor: COLORS.darkBgColor,
  minHeight: 550,
  marginTop: 20,
  marginBottom: 40,
  paddingBottom: 15
},

story_detail_value: {
  fontFamily: 'Champ-Bold',
  color: COLORS.textColor
},

story_date_container: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
},

story_date_value: {
  fontFamily: 'Champ-Bold',
  color: COLORS.grayColor,
  marginLeft: 5,
},

story_image: {
  width: '100%',
  height: 100,
  marginVertical: 15,
  backgroundColor: COLORS.darkerBgColor,
},

story_content: {
  fontFamily: 'Champ-Bold',
  fontSize: 17,
  color: COLORS.textColor,
  textAlign: 'justify',
},

});

