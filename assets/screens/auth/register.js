import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import {useFonts} from 'expo-font';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from 'axios';
import { baseUrl } from '../../constants/url';

export default function Register(props) {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [penname, setPenname] = useState('');

  const onSubmitFormHandler = async (event) => {
    if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim() || !penname.trim()) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}accountRegister`, {
        user_fname: fname,
        user_lname: lname,
        user_email: email,
        password: password,
        user_penname: penname,
      });
      if (response.status === 200) {
        setFname('');
        setLname('');
        setEmail('');
        setPassword('');
        setPenname('');

        ToastAndroid.show('Account successfully created', ToastAndroid.SHORT);
        return navigation.navigate(ROUTES.LOGIN)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('Invalid information', ToastAndroid.SHORT);
    }
  };


  const {navigation} = props;

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

    <ScrollView vertical={true}>
      <View style={styles.register_container}>

        <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.LOGIN)} style={{color: COLORS.purpleColor, position: 'absolute', top: 38, left: 20,}}>
          <Icon
            name="ios-return-up-back-sharp"
            size={30}
            color={COLORS.purpleColor}
          />
        </TouchableOpacity>


        <View style={styles.register_logo_container}>
          <Image
            style={styles.gcwento_logo}
            source={require('../../GCwento_purple_logo.png')}
          />
        </View>

        <StatusBar style="auto" />

        <KeyboardAvoidingView style={styles.register_form_container}>
          <Text style={styles.register_form_text_header}> REGISTER </Text>

          <View style={{marginTop: 20, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
            <View>
              <Text style={{ textAlign: 'center', color: COLORS.purpleColor, fontSize: 20, fontFamily: 'Momcake-Bold'}}> Personal Information </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
          </View>

          <View style={styles.register_form_input_container}> 
            <TextInput
              value={fname}
              onChangeText={text => setFname(text)}
              style={styles.register_form_input}
              placeholder="Enter First Name" placeholderTextColor="#E5E5E5"
            />
          </View>

          <View style={styles.register_form_input_container}> 
            <TextInput
              value={lname}
              onChangeText={text => setLname(text)}
              style={styles.register_form_input}
              placeholder="Enter Last Name" placeholderTextColor="#E5E5E5"
            />
          </View>


          <View style={{marginTop: 30, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
            <View>
              <Text style={{ textAlign: 'center', color: COLORS.purpleColor, fontSize: 20, fontFamily: 'Momcake-Bold'}}> Account Information </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
          </View>

          <View style={styles.upload_photo_button_container}> 
            <Text style={styles.add_avatar_text}> Avatar </Text>
            <TouchableOpacity style={styles.upload_photo_button}>
              <Image
                style={styles.upload_image_icon}
                source={require('../../add_image_icon.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.register_form_input_container}> 
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.register_form_input}
              placeholder="Enter Email" placeholderTextColor="#E5E5E5"
            />
          </View>

          <View style={styles.register_form_input_container}> 
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              style={styles.register_form_input}
              placeholder="Enter Password" placeholderTextColor="#E5E5E5"
            />
          </View>

          <View style={styles.register_form_input_container}> 
            <TextInput
              value={penname}
              onChangeText={text => setPenname(text)}
              style={styles.register_form_input}
              placeholder="Enter Pen Name" placeholderTextColor="#E5E5E5"
            />
          </View>
      
          <TouchableOpacity style={styles.register_button} onPress={onSubmitFormHandler}>
              <Text style={styles.register_button_text}> REGISTER </Text>
          </TouchableOpacity>

            <View style={styles.register_details}>
            <Text style={styles.register_text}> By creating an account, you're agreeing with our <Text style={styles.tac_text} onPress={()=>navigation.navigate(ROUTES.TERMSANDCONDITIONS)}> TERMS & CONDITIONS </Text></Text>
          </View>

        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  register_container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: 'center',
    paddingTop: 40,
  },

  gcwento_logo:{
    width: 70, 
    height: 33,
    marginTop: 30,
  },

  register_form_container: {
    width: '100%',
    backgroundColor: COLORS.darkBgColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    padding: 40,
    alignItems: 'center',
    paddingTop: 40,
    marginTop: 20,
  },

  register_form_text_header:{
    color: COLORS.dWhiteColor,
    fontSize: 50,
    fontFamily: 'Momcake-Bold'
  },

  register_form_input_icon:{
    width: 25,
    height: 25,
    left: 15,
    top: 48,
  },

  register_form_input_container:{
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 1
  },

  register_form_input:{
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.grayColor,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: COLORS.textColor,
    fontSize: 16,
    fontFamily: 'Champ-Bold'
  },

  register_button:{
    backgroundColor: COLORS.purpleColor,
    width: '95%',
    padding: 17,
    borderRadius: 50,
    marginTop: 30
  },

  register_button_text:{
    textAlign: 'center',
    fontFamily: 'Momcake-Bold',
    fontSize: 35,
    color: 'white'
  },

  register_details: {
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
    flexWrap: 'wrap',
    textAlign: 'center'
  },

  register_text:{
    color: 'white',
    fontFamily: 'Champ-Bold',
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'center'
  },

  tac_text:{
    fontFamily: 'Momcake-Bold',
    color: COLORS.purpleColor,
    fontSize: 20,
    marginTop: 3
  },

  inputs_label: {
    color: 'white',
    fontFamily: 'Champ-Bold',
    color: COLORS.dWhiteColor,
    fontSize: 16,
  },

  upload_photo_button:{
    backgroundColor: 'none',
  },

  upload_photo_button_container:{
    width: '40%',
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

});
