import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { ROUTES } from '../../constants/routes';
import { useFocusEffect } from "@react-navigation/native";

import axios from 'axios';
import { baseUrl } from '../../constants/url';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountDetails({navigation, route}) {
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [penname, setPenname] = React.useState("");

  const [profile, setProfile] = useState([]);

  AsyncStorage.getItem("userId");

  useFocusEffect(
    React.useCallback(() => {
      getProfileData()
    }, [])
  );

  const getProfileData = async () => {
    user_id = await AsyncStorage.getItem("userId");
    try {
      const response = await axios.get(
        `${baseUrl}getProfileData/${user_id}`,
        {}
      ).then((response) => {
        
          setProfile(response.data.payload[0]);
          setFname(response.data.payload[0].user_fname)
          setLname(response.data.payload[0].user_lname)
          setEmail(response.data.payload[0].user_email)
          setPenname(response.data.payload[0].user_penname)
        }
      );

    } catch (error) {
    }
  };

  const onSubmitFormHandler = async (event) => {
    if (!fname.trim() || !lname.trim() || !email.trim() || !penname.trim()) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}updateProfile`, {
        id: profile.id,
        user_fname: fname,
        user_lname: lname,
        user_email: email,
        user_penname: penname,

      });
      if (response.status === 200) {
        
        ToastAndroid.show('Profile successfully updated', ToastAndroid.SHORT);
        return navigation.navigate(ROUTES.ACCOUNTLANDINGPAGE)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView vertical={true} style={styles.scrollview_container}>

      <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.ACCOUNTLANDINGPAGE)}>
        <Icon style={{color: COLORS.purpleColor, marginTop: 10}}
           name="ios-return-up-back-sharp"
           size={30}
        />
      </TouchableOpacity>

      <View style={{marginTop: 50, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
        <View>
          <Text style={{ textAlign: 'center', color: COLORS.purpleColor, fontSize: 22, fontFamily: 'Momcake-Bold'}}> Personal Information </Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
      </View>

      <Text style={styles.label}> First Name </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit first name here..." placeholderTextColor="#E5E5E5"
          value={fname}
          onChangeText={fname => setFname(fname)}
        />
      </View>

      <Text style={styles.label}> Last Name </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit last name here..." placeholderTextColor="#E5E5E5"
          value={lname}
          onChangeText={lname => setLname(lname)}
        />
      </View>

      <View style={{marginTop: 40, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
        <View>
          <Text style={{ textAlign: 'center', color: COLORS.purpleColor, fontSize: 22, fontFamily: 'Momcake-Bold'}}> Account Information </Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
      </View>

      {/* <View style={styles.upload_photo_button_container}> 
        <Text style={styles.add_avatar_text}> Avatar </Text>
        <TouchableOpacity style={styles.upload_photo_button}>
          <Image
            style={styles.upload_image_icon}
            source={require('../../add_image_icon.png')}
          />
        </TouchableOpacity>
      </View> */}

      <Text style={styles.label}> Email </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit email here..." placeholderTextColor="#E5E5E5"
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>

      <Text style={styles.label}> Pen Name </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit pen name here..." placeholderTextColor="#E5E5E5"
          value={penname}
          onChangeText={penname => setPenname(penname)}
        />
      </View>

      <TouchableOpacity style={styles.save_button} onPress={onSubmitFormHandler}>
          <Text style={styles.save_button_text}> SAVE </Text>
      </TouchableOpacity>
      
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBgColor,
    padding: 20,
    paddingBottom: 1,
  },

  label: {
    fontFamily: 'Champ-Bold',
    color: COLORS.purpleColor,
    fontSize: 16,
    marginTop: 20,
  },

  form_input:{
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

  add_avatar_text: {
    color: COLORS.dWhiteColor,
    fontFamily: 'Momcake-Bold'
  },

  upload_photo_button_container:{
    width: '40%',
    borderWidth: 1,
    borderColor: COLORS.grayColor,
    borderRadius: 8,
    paddingVertical: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
  },
  
  upload_image_icon:{
    width: 50,
    height: 50,
  },

  save_button:{
    backgroundColor: COLORS.purpleColor,
    borderWidth: 2,
    borderColor: COLORS.purpleColor,
    width: '100%',
    padding: 10,
    borderRadius: 50,
    marginTop: 45,
    marginBottom: 30,
  },

  save_button_text:{
    textAlign: 'center',
    fontFamily: 'Momcake-Bold',
    fontSize: 20,
    color: 'white',
  },

});