import React, {useState} from 'react';
import {View, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../constants/url';
import { ROUTES } from '../constants/routes';

const DeleteButton = (data) => {
  const [state, setState] = useState(false);
  AsyncStorage.getItem("userId");
  const id = data.data;

  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Delete Story",
      "Are you sure you want to delete this story?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            deleteStory(id);
          }
          ,
          
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const deleteStory = async (event) => {
    user_id = await AsyncStorage.getItem("userId");
    try {
      const response = await axios.post(`${baseUrl}deletestory/${event}`, {
        id:event, 
        status:"inactive"
      }
      
      );
      if (response.status === 200) {
        ToastAndroid.show('Story successfully deleted', ToastAndroid.SHORT);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => showConfirmDialog(data.data)}>
      <Icon
        name= {state ? 'trash' : 'trash-o'}
        size={28}
        color={'red'}
      />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteButton;