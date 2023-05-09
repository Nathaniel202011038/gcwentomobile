import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { SelectList } from 'react-native-dropdown-select-list';
import StoryFilter from '../../components/story_filter';

import axios from 'axios';
const baseUrl = 'http://192.168.100.8/gcwento/restAPI/';

export default function Home({navigation}) {
  
  const [story, setStory] = useState('');
  const [selected_category, setSelected_category] = React.useState("");
  const [storyList, setStoryList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchstories();
  }, []);

  const onRefresh = useCallback(() => {
    fetchstories();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  
  const fetchstories = async () => {
    try {
      const response = await axios.get(`${baseUrl}getstoryblocks`, {

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

  return (

      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
            <StoryFilter data={storyList} input={story} setInput={setStory} navigation={navigation}/>
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