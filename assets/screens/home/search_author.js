import React, {useState} from 'react' ;
import { StyleSheet, Text, View, TextInput, ScrollView, } from 'react-native';
import {useFonts} from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import AuthorFilter from '../../components/author_filter';

export default function SearchAuthor({navigation}) {

  // const {navigation} = props;
  const [author, setAuthor] = useState('');

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


  const AuthorList = [
    {
      id: 1,
      user_image : require('../../images/general_icons/user_icon.png'),
      author_name: 'diakosianthony',
      story_star_count: 21,
    },

    {
      id: 2,
      user_image : require('../../images/general_icons/user_icon.png'),
      author_name: 'akosikim',
      story_star_count: 19,
    },

    {
      id: 3,
      user_image : require('../../images/general_icons/user_icon.png'),
      author_name: 'akosilou',
      story_star_count: 17,
    },

  ]

  return (
      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}>
          <View style={styles.first_row_container}>
            <Text style={styles.label}> Search </Text>
            <View style={styles.text_input_container}>
              <Icon5
                name="search"
                size={20}
                color={COLORS.purpleColor}
              />
              <TextInput style={styles.search_input}
              placeholder="Search author here..." placeholderTextColor="#E5E5E5" value={author} onChangeText={text=>setAuthor(text)}/>
            </View>
          </View>

          <View style={styles.second_row_container}>
              <Text style={styles.bigtext_header}> Authors </Text>

              <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 100}}></View>

          </View>

          <View style={styles.content_row_container}>

            <AuthorFilter data={AuthorList} input={author} setInput={setAuthor} navigation={navigation}/>

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

  content_row_container: {
    marginTop: 10,
    minHeight: 900,
    paddingBottom: 30
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

});

