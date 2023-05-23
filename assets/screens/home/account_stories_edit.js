import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import TextArea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/Ionicons';
import { ROUTES } from '../../constants/routes';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from "@react-navigation/native";
import Iconfa from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import { baseUrl } from '../../constants/url';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountStoriesEdit({navigation, route}) {
  const [selected_category, setSelected_category] = React.useState("");
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user_id, setUserId] = useState("");
  const [newFontSize, setFontSize] = useState(16); // Default font size

  const [categories, setCategories] = useState([]);
  const category_picker = ["Action", "Comedy", "Horror", "Mystery", "Romance", "Thriller", "Others"];

  AsyncStorage.getItem("userId").then((value) => setUserId(value));
 

  const onChangeTitle = (title) => {
    setTitle(title);
  };

  const onChangeContent = (content) => {
    setContent(content);
  };

  const onSubmitFormHandler = async (event) => {
    if (!title.trim() || !content.trim()) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}editStory`, {
        id: route.params.id,
        story_title: title,
        story_content: content,
        story_category: selected_category,

      });
      if (response.status === 200) {
        setTitle('');
        setContent('');
        
        ToastAndroid.show('Story successfully edited', ToastAndroid.SHORT); 
        return navigation.navigate(ROUTES.ACCOUNTSTORIES)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setTitle(route.params.story_title)
      setContent(route.params.story_content)
      setSelected_category(route.params.story_category)
    }, [])
  );

  function select_categories(selected_categories){
    if(categories.includes(selected_categories)){
      setCategories(categories.filter(Category => Category !== selected_categories))
      return;
    }
    setCategories(Categories => Categories.concat(selected_categories))
  }


  //Fonts
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

  // Function to increase the font size
  const increaseFontSize = () => {
    setFontSize(newFontSize + 2); // Increase font size by 2
  };

  // Function to decrease the font size
  const decreaseFontSize = () => {
    setFontSize(newFontSize - 2); // Decrease font size by 2
  };

  return (

      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}>
          <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.ACCOUNTSTORIES)}>
            <Icon style={{color: COLORS.purpleColor, marginLeft: 15, marginTop: 20}}
              name="ios-return-up-back-sharp"
              size={30}
              color={COLORS.purpleColor}
            />
          </TouchableOpacity>
          <Text style={styles.bigtext_header}> Edit Story </Text>
          <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 115}}></View>

          <View style={styles.edit_story_container}>
            <View style={styles.edit_story_row1_container}>
              <View style={{marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
                <View>
                  <Text style={{ textAlign: 'center', color: COLORS.dWhiteColor, fontSize: 30, fontFamily: 'Momcake-Bold'}}> DETAILS </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
              </View>
              
              <View style={styles.category_container}>
                <Text style={styles.label}> Select Category </Text>
                <View style={{marginTop: 20}}>
                  <SelectDropdown
                    data={category_picker}
                    defaultValue={selected_category}
                    onSelect={(selectedItem, index) => {
                      setSelected_category(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.purpleColor} size={18} />;
                    }}
                    buttonStyle={styles.dropdownBtn}
                    buttonTextStyle={styles.dropdowntxt}
                  />
                </View>
              </View>

              {/* <Text style={styles.label}> Upload Cover Photo </Text>

              <View style={styles.upload_photo_button_container}> 
                <Text style={styles.add_avatar_text}> Avatar </Text>
                <TouchableOpacity style={styles.upload_photo_button}>
                  <Image
                    style={styles.upload_image_icon}
                    source={require('../../add_image_icon.png')}
                  />
                </TouchableOpacity>
              </View> */}

              <Text style={styles.label}> Title </Text>
              <View style={styles.input_container}> 
                <TextInput
                  style={styles.form_input}
                  placeholder="Enter story title here..." placeholderTextColor="#E5E5E5"
                  value={title}
                  onChangeText={onChangeTitle}
                />
              </View>

              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30}}>
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

              <Text style={styles.label}> Content </Text>
              <View style={styles.form_story_content_input_container}> 
                <TextArea multiline={true} placeholder="Start your story here..." placeholderTextColor="#E5E5E5" 
                value={content}
                onChangeText={onChangeContent}
                style={{borderColor: COLORS.grayColor,
                  marginTop: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  color: COLORS.textColor,
                  fontSize: newFontSize,
                  fontFamily: 'Champ-Bold',
                  textAlignVertical: 'top',
                  borderWidth: 1,
                  borderColor: COLORS.grayColor,
                  height: 450,}} 
                />
              </View>
            </View>

            <TouchableOpacity style={styles.publish_button} onPress={onSubmitFormHandler}>
              <Text style={styles.publish_button_text}> SAVE </Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: COLORS.bgColor,
  },

  scrollview_container: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
  },

  bigtext_header: {
    fontFamily: 'Emotional',
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.dWhiteColor,
  },

  edit_story_container: {
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: COLORS.darkBgColor,
    marginVertical: 30,
    minHeight: 800,
    elevation: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  label: {
    fontFamily: 'Champ-Bold',
    color: COLORS.purpleColor,
    fontSize: 16,
    marginTop: 20,
  },

  upload_photo_button:{
    backgroundColor: 'none',
  },

  upload_photo_button_container:{
    marginVertical: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: COLORS.grayColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },

  upload_image_icon:{
    width: 50,
    height: 50,
  },

  add_avatar_text: {
    color: COLORS.dWhiteColor,
    fontFamily: 'Momcake-Bold'
  },

  form_input_container:{
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 1
  },

  form_story_content_input_container: {
    width: '100%',
    marginBottom: 10,
  },

  form_input:{
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.grayColor,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: COLORS.textColor,
    fontSize: 16,
    fontFamily: 'Champ-Bold',
  },

  form_story_content_input: {
    borderWidth: 1,
    borderColor: COLORS.grayColor,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: COLORS.textColor,
    fontSize: 16,
    fontFamily: 'Champ-Bold',
    textAlignVertical: 'top',
    height: 450,
  },

  publish_button: {
    borderWidth: 2,
    borderColor: COLORS.purpleColor,
    backgroundColor: COLORS.purpleColor,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },

  publish_button_text: {
    fontSize: 20,
    fontFamily: 'Momcake-Bold',
    color: 'white',
  },

  category_checkBox: {
    width: 25,
    height: 25, 
    borderWidth: 2,
    borderColor: COLORS.purpleColor,
    borderRadius: 3,
    padding: 3,
  },

  category_list:{
    marginVertical: 10,
    marginLeft: 20,
  },

  category_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  category_name: {
    fontSize: 16,
    color: COLORS.textColor,
    marginLeft: 10,
    fontFamily: 'Momcake-Bold'
  },

  selected_category: {
    color: COLORS.purpleColor,
    backgroundColor: COLORS.purpleColor,
  }
});