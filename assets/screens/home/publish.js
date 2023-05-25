import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import TextArea from 'react-native-textarea';
import { ROUTES } from '../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Iconfa from 'react-native-vector-icons/FontAwesome';

import { img_url } from '../../constants/url';
import axios from 'axios';
import { baseUrl } from '../../constants/url';

export default function Publish({navigation}) {
  const [selected_category, setSelected_category] = React.useState("");
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user_id, setUserId] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const category_picker = ["Action", "Comedy", "Horror", "Mystery", "Romance", "Thriller", "Others"];

  AsyncStorage.getItem("userId");
  // AsyncStorage.getItem("userId").then((value) => setUserId(value));
  
  useEffect(() => {
    const getFontSize = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem('fontSize');
        if (savedFontSize !== null) {
          setFontSize(parseInt(savedFontSize));
        }
      } catch (error) {
        console.log('Error retrieving font size:', error);
      }
    };
    fetchFontSize();
    getFontSize();
  }, []);

  const fetchFontSize = async () => {
    const userId = await AsyncStorage.getItem("userId");
  
    try {
      const response = await axios.get(`${baseUrl}getUserFontSize/${userId}`, {});
      if (response.status === 200) {
        setFontSize(response.data.payload[0].fontSize);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // Handle error
    }
  };

  const increaseFontSize = async () => {
    const newFontSize = fontSize + 2;
    setFontSize(newFontSize);
    onSubmitFontSizeHandler(newFontSize.toString());
  };
  
  const decreaseFontSize = async () => {
    const newFontSize = fontSize - 2;
    setFontSize(newFontSize);
    onSubmitFontSizeHandler(newFontSize.toString());
  };

  const saveFontSize = async (newFontSize) => {
    try {
      await AsyncStorage.setItem('fontSize', newFontSize);
    } catch (error) {
      console.log('Error saving font size:', error);
    }
  };

  const onSubmitFontSizeHandler = async (newFontSize) => {
    const userId = await AsyncStorage.getItem("userId");
  
    try {
      const response = await axios.post(`${baseUrl}updateFontSize`, {
        id: userId,
        fontSize: newFontSize,
      });
      if (response.status === 200) {
        ToastAndroid.show('Font-size changed to ' + newFontSize, ToastAndroid.SHORT);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // Handle error
    }
  };
 
  const onSubmitFormHandler = async (event) => {
    if (!title.trim() || !content.trim()) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}createstory`, {
        user_id: user_id,
        story_title: title,
        story_content: content,
        story_category: selected_category,

      });
      if (response.status === 200) {
        setTitle('');
        setContent('');
        
        ToastAndroid.show('Story successfully created', ToastAndroid.SHORT);
        return navigation.navigate(ROUTES.HOMETABNAVIGATOR)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
    }
  };


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

  return (

      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}>
          <Text style={styles.bigtext_header}> Create your own Story! </Text>
          <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 100}}></View>

          <View style={styles.edit_story_container}>
            <View style={styles.edit_story_row1_container}>
              <View style={{marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
                <View>
                  <Text style={{ textAlign: 'center', color: COLORS.dWhiteColor, fontSize: 30, fontFamily: 'Momcake-Bold'}}> DETAILS </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
              </View>
              
              <Text style={styles.label}> Category </Text>
              <View style={{marginTop: 10}}>
                <SelectDropdown
                  data={category_picker}
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
                  value={title}
                  onChangeText={text => setTitle(text)}
                  style={styles.form_input}
                  placeholder="Enter story title here..." placeholderTextColor="#E5E5E5"
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
                <TextArea 
                  value={content}
                  onChangeText={text => setContent(text)}
                  style={{borderColor: COLORS.grayColor,
                  marginTop: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  color: COLORS.textColor,
                  fontSize: fontSize,
                  fontFamily: 'Champ-Bold',
                  textAlignVertical: 'top',
                  borderWidth: 1,
                  borderColor: COLORS.grayColor,
                  height: 450,}} multiline={true} placeholder="Start your story here..." placeholderTextColor="#E5E5E5" />
              </View>


            </View>

            <TouchableOpacity style={styles.publish_button} onPress={onSubmitFormHandler}>
              <Text style={styles.publish_button_text}> PUBLISH </Text>
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
    paddingTop: 30,
    backgroundColor: COLORS.bgColor,
  },

  scrollview_container: {
    width: '100%',
    paddingVertical: 20,
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