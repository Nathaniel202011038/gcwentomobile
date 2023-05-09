import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import TextArea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/Ionicons';
import { ROUTES } from '../../constants/routes';

export default function AccountStoriesEdit(props) {

  const {navigation} = props;

  const [categories, setCategories] = useState([]);
  const category_Options =['Action', 'Comedy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Others'];

  function select_categories(selected_categories){
    if(categories.includes(selected_categories)){
      setCategories(categories.filter(Category => Category !== selected_categories))
      // console.log(categories)
      return;
    }
    setCategories(Categories => Categories.concat(selected_categories))
    console.log(categories)
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


  return (

      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}>
          <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.ACCOUNTSTORIES)}>
            <Icon style={{color: COLORS.purpleColor, marginLeft: 15}}
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
                <View style={styles.category_list}>
                  {category_Options.map(option => (
                    <View key={option} style={styles.category_item}>
                      <TouchableOpacity style={styles.category_checkBox} onPress={()=>select_categories(option)}>
                        {categories.includes(option) && <Text style={styles.selected_category}> . </Text>}
                      </TouchableOpacity>
                      <Text style={styles.category_name}>{option}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <Text style={styles.label}> Upload Cover Photo </Text>

              <View style={styles.upload_photo_button_container}> 
                <Text style={styles.add_avatar_text}> Avatar </Text>
                <TouchableOpacity style={styles.upload_photo_button}>
                  <Image
                    style={styles.upload_image_icon}
                    source={require('../../add_image_icon.png')}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}> Title </Text>
              <View style={styles.input_container}> 
                <TextInput
                  style={styles.form_input}
                  placeholder="Enter story title here..." placeholderTextColor="#E5E5E5"
                />
              </View>

              <Text style={styles.label}> Content </Text>
              <View style={styles.form_story_content_input_container}> 
                <TextArea style={styles.form_story_content_input} multiline={true} placeholder="Start your story here..." placeholderTextColor="#E5E5E5" />
              </View>
            </View>

            <TouchableOpacity style={styles.publish_button}>
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