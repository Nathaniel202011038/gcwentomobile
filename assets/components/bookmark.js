import React, {useState} from 'react';
import {View, TouchableOpacity, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native";
import { baseUrl } from '../constants/url';

const BookmarkButton = (data) => {

  AsyncStorage.getItem("userId");
  const story_id = data.data;
  const [state, setState] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      checkBookmark();
      setState(false);
      return () => {
        checkBookmark();
        setState(false);
      };
    }, [])
  );

  const checkBookmark = async () => {
    user_id = await AsyncStorage.getItem("userId");

    try {
      const response = await axios.post(
        `${baseUrl}checkBookmark/${story_id}/${user_id}`,
        {}
      );
      if (response.status === 200) {
        setState(true);
      } else {
        setState(false);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // alert("Invalid Username or Email!");
    }
  };

  const onSubmitFormHandler = async (event) => {
    user_id = await AsyncStorage.getItem("userId");
     try {
       const response = await axios.post(`${baseUrl}addtobookmark`, {
         user_id,
         story_id,
       }
       
       );
       if (response.status === 200) {
         ToastAndroid.show('Story successfully bookmarked', ToastAndroid.SHORT);
       } else {
         throw new Error("An error has occurred");
       }
    } catch (error) {
       alert(error);
    }
  };

  const click = () => {
    setState(!state);
    
  
    if (!state) {
      // console.log(user_id);
      onSubmitFormHandler();
    } else {
      unSave();
    }
  };
  
  const unSave = async (event) => {

    try {
      const response = await axios.post(`${baseUrl}deletebookmark/${story_id}/${user_id}`, {
      }
      
      );
      if (response.status === 200) {
        ToastAndroid.show('Story removed from bookmarks', ToastAndroid.SHORT);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };


  return (
    <View>
      <TouchableOpacity onPress={() => click()}>
      <Icon
        name= {state ? 'bookmark' : 'bookmark-o'}
        size={28}
        color={COLORS.purpleColor}
      />
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkButton;