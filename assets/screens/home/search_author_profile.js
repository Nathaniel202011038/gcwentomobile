import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { SelectList } from 'react-native-dropdown-select-list';
import SearchAuthorProfileStoryFilter from '../../components/search_author_profile_story_filter';
import { ROUTES } from '../../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchAuthorProfile({navigation}) {
  
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

        <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.SEARCHAUTHOR)}>
          <Icon style={{color: COLORS.purpleColor}}
            name="ios-return-up-back-sharp"
            size={30}
            color={COLORS.purpleColor}
          />
        </TouchableOpacity>

            <View style={styles.author_container}>
                <View style={styles.author_quick_details_container}>
                    <Image
                        style={styles.user_image}
                        source={require('../../../assets/user_icon.png')}
                    />
                    <View style={styles.author_details}>
                        <Text style={styles.author_name}> akotosinathoy </Text>
                        <Text style={styles.author_stories_count}> Stories Published: 21 </Text>
                    </View>
                </View>
                {/* <TouchableOpacity style={styles.visit_button} onPress={()=>navigation.navigate(ROUTES.SEARCHAUTHORPROFILE)}>
                    <Text style={styles.visit_button_text}> VISIT </Text>
                </TouchableOpacity> */}
            </View>

            <View style={{width: '100%', height: 1, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginVertical: 20,}}></View>
           
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
            <SearchAuthorProfileStoryFilter data={StoryList} input={story} setInput={setStory} navigation={navigation}/>
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

  user_image: {
    width: 35,
    height: 35
  },

  author_container: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    borderColor: COLORS.darkerBgColor,
    backgroundColor: COLORS.darkBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  author_quick_details_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  author_details:{
    marginLeft: 5
  },

  author_name: {
    fontFamily: 'Champ-Bold',
    color: COLORS.dWhiteColor,
    fontSize: 16
  },

  author_stories_count: {
    fontFamily: 'Champ-Bold',
    color: COLORS.purpleColor,
    fontSize: 16
  },

  visit_button:{
    borderWidth: 2,
    borderColor: COLORS.purpleColor,
    backgroundColor: COLORS.purpleColor,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  visit_button_text: {
    fontSize: 16,
    fontFamily: 'Momcake-Bold',
    color: 'white'
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
    // borderBottomWidth: 1,
    paddingBottom: 20,
    // borderColor: COLORS.grayColor,
  },

  second_row_container: {
    marginBottom: 20,
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


});