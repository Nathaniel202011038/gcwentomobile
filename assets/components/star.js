import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
const baseUrl = 'http://192.168.100.8/gcwento/restAPI/';

const StarButton = (data) => {
  const [state, setState] = useState(false);
  const [stars, setStars] = useState(0);

  const getstars = async () => {
    try {
      const response = await axios.get(`${baseUrl}getstorystars/${data.data}`, {

      });
      if (response.status === 200 || refreshing === true) {
        setStars(response.data.payload[0].stars);
        // console.log(response.data.payload)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };

  AsyncStorage.getItem("userId");

  useFocusEffect(
    React.useCallback(() => {
      checkStar();
      getstars();
      setState(false);
      return () => {
        checkStar();
        getstars();
        setState(false);
      };
    }, [])
  );

  const checkStar = async () => {
    user_id = await AsyncStorage.getItem("userId");

    try {
      const response = await axios.post(
        `${baseUrl}checkStar/${data.data}/${user_id}`,
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
       const response = await axios.post(`${baseUrl}addtostar`, {
         user_id:user_id,
         story_id:data.data,
       }
       
       );
       if (response.status === 200) {
        //  alert(` Succesfully saved!`);
         getstars();

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
    user_id = await AsyncStorage.getItem("userId");

    try {
      const response = await axios.post(`${baseUrl}deletestar/${data.data}/${user_id}`, {
      }
      
      );
      if (response.status === 200) {
        console.log(response.status)
        // alert(` Succesfully Removed!`);
        getstars();

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };


  return (
    <View style={styles.star_count_container}>
      <TouchableOpacity onPress={() => click()}>
        <Icon
          name= {state ? 'star' : 'star-o'}
          size={28}
          color={COLORS.purpleColor}
        />
      </TouchableOpacity>
      <Text style={styles.story_star_count}> {stars} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  story_star_count: {
    fontFamily: 'Momcake-Bold',
    color: COLORS.purpleColor,
    fontSize: 18,
    marginLeft: 3
  },

  star_count_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15
  },

});

export default StarButton;

