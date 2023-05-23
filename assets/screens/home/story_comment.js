import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import {useFonts} from 'expo-font';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ROUTES } from '../../constants/routes';
import { useFocusEffect } from "@react-navigation/native";

import UserComment from '../../components/user_comment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from '../../constants/url';


export default function StoryComment({navigation, route}) {

  const [comments, setComments] = useState([]);
  const [newcomment, setNewcomment] = useState("");

  const onChangeComment = (newcomment) => {
    setNewcomment(newcomment);
  };

  useFocusEffect(
    React.useCallback(() => {
      getComments();
      return () => {
        getComments();
      };
    }, [])
  );

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getComments/${route.params.id}`,
        {}
      );
      if (response.status === 200) {
        setComments(response.data.payload);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
    }
  };

  const addComment = async () => {
    user_id = await AsyncStorage.getItem("userId");
  
    if (!newcomment.trim()) {
      ToastAndroid.show('Type any comment', ToastAndroid.SHORT);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}addComment`, {
        user_id: user_id,
        comment_content: newcomment,
        story_id: route.params.id,
      });
      if (response.status === 200) {
        getComments();
        setNewcomment("");
        ToastAndroid.show('Comment added', ToastAndroid.SHORT);
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
    <ScrollView vertical={true} style={styles.whole_container}>

      <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.HOME)}>
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

        {comments.length>0 ? <UserComment data={comments} setInput={setComments}/> : 
          <View>
            <Text style={{ marginTop: 250, textAlign: 'center', color: COLORS.purpleColor, fontSize: 20, fontFamily: 'Momcake-Bold'}}>No comments yet </Text>
          </View>
        }
        

        <KeyboardAvoidingView style={styles.comment_input_container}>

          <TextInput
            style={styles.comment_input}
            placeholderTextColor="#E5E5E5"
            placeholder="Type your comment here..."
            value={newcomment}
            onChangeText={onChangeComment}
          />
          
          <TouchableOpacity onPress={() => addComment()}>
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

