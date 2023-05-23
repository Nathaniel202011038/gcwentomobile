import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import {useFonts} from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ROUTES } from '../../constants/routes';

import UserComment from '../../components/user_comment';

export default function SearchAuthorProfileStoryComments(props) {

  const {navigation} = props;
  const [comment, setComment] = useState([]);

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


const CommentList = [
  {
    story_id: 1,
    id: 1,
    user_image : require('../../kalampag_ng_papag.jpg'),
    user_penname: 'Peanut',
    comment_date: '04-30-2023 | 12:56 PM',
    comment_content: 'This is a very good story!',
  },

  {
    story_id: 1,
    id: 2,
    user_image : require('../../kalampag_ng_papag.jpg'),
    user_penname: 'Peanut',
    comment_date: '04-30-2023 | 12:56 PM',
    comment_content: 'This is a very good story! I would like to congratulate the author for such a well-written story. Highly recommended. Thank you for sharing your creativity!',
  },
]


  return (
    <ScrollView vertical={true} style={styles.whole_container}>

      <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.SEARCHAUTHORPROFILE)}>
        <Icon style={{color: COLORS.purpleColor}}
          name="ios-return-up-back-sharp"
          size={30}
          color={COLORS.purpleColor}
        />
      </TouchableOpacity>
        
      <View style={styles.container}> 
        <View style={{marginTop: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
          <View>
            <Text style={{ textAlign: 'center', color: COLORS.dWhiteColor, fontSize: 30, fontFamily: 'Momcake-Bold'}}> COMMENTS </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
        </View>

        <UserComment data={CommentList} input={comment} setInput={setComment}/>

        <KeyboardAvoidingView style={styles.comment_input_container}>

          <TextInput
            style={styles.comment_input}
            placeholderTextColor="#E5E5E5"
            placeholder="Type your comment here..."
          />
          <TouchableOpacity>
            <Icon style={{color: COLORS.purpleColor}}
              name="send"
              size={30}
              color={COLORS.purpleColor}
            />
          </TouchableOpacity>

        </KeyboardAvoidingView>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  whole_container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: COLORS.darkerBgColor,
  },

  container: {
    borderRadius: 10,
    paddingBottom: 75,
    paddingHorizontal: 10,
    backgroundColor: COLORS.bgColor,
    minHeight: 680,
    marginBottom: 40,
  },

  comment_input_container: {
    position: 'absolute',
    bottom: 17,
    left: 10,
    right: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},

comment_input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: COLORS.textColor,
    fontSize: 15,
    fontFamily: 'Champ-Bold',
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: COLORS.darkBgColor,
    elevation: 7,
    width: '88%',
    verticalAlign: 'middle'
}

});

