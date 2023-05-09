import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {useFonts} from 'expo-font';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Reply comment
import axios from 'axios';
const baseUrl = 'http://192.168.100.8/gcwento/restAPI/';

export default function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitFormHandler = async (event) => {
    if (!email.trim() || !password.trim()) {
      alert("Email and Password are needed!");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}login`, {
        user_email: email,
        password: password
      });
      if (response.status === 200) {
        // console.log(response.data.payload.id);
        AsyncStorage.setItem("userId", JSON.stringify(response.data.payload.id));

        setEmail('');
        setPassword('');
        // return navigation.navigate(ROUTES.LOGIN);
        console.log(response.data.payload.id);

        alert("Account successfully logged in!");
        return navigation.navigate(ROUTES.BOTTOMTABNAVIGATOR)

      } else {
        throw new Error("An error has occurred!");
      }
    } catch (error) {
      alert("Incorrect email or password!");
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
    <View style={styles.login_container}>

      <View style={styles.login_logo_container}>
        <Image
          style={styles.gcwento_logo}
          source={require('../../GCwento_purple_logo.png')}
        />
      </View>

      <StatusBar style="auto" />

      <KeyboardAvoidingView style={styles.login_form_container}>
        <Text style={styles.login_form_text_header}> WELCOME! </Text>

        <View style={styles.login_form_input_container}> 
          <Image
            style={styles.login_form_input_icon}
            source={require('../../user_icon.png')}
          />
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.login_form_input}
            placeholder="Enter Email" placeholderTextColor="#E5E5E5"
          />
        </View>
        
        <View style={styles.login_form_input_container}> 
          <Image
            style={styles.login_form_input_icon}
            source={require('../../lock_icon.png')}
          />
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.login_form_input}
            placeholder="Enter Password" placeholderTextColor="#E5E5E5"
          />
        </View>

        <TouchableOpacity style={styles.login_button} onPress={onSubmitFormHandler}>
            <Text style={styles.login_button_text}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.register_details}>
          <Text style={styles.no_account_text}> Doesn't have an account yet? </Text>
          <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.REGISTER)}>  
            <Text style={styles.register_text}>REGISTER</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version_detail}>ver 1.1 </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  login_container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: 'center',
    paddingTop: 40,
  },

  gcwento_logo:{
    width: 280, 
    height: 125,
    marginTop: 90,
  },

  login_form_container: {
    width: '100%',
    backgroundColor: COLORS.darkBgColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 450,
    position: 'absolute',
    bottom: 0,
    padding: 40,
    alignItems: 'center',
    paddingTop: 50
  },

  login_form_text_header:{
    color: COLORS.dWhiteColor,
    fontSize: 50,
    fontFamily: 'Momcake-Bold'
  },

  login_form_input_icon:{
    width: 25,
    height: 25,
    position: 'absolute',
    left: 15,
    top: 48,
  },

  login_form_input_container:{
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  login_form_input:{
    borderWidth: 1,
    borderColor: COLORS.grayColor,
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 47,
    borderRadius: 60,
    color: COLORS.textColor,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Champ-Bold',
    // elevation: 5, shadow
  },

  login_button:{
    backgroundColor: COLORS.purpleColor,
    width: '95%',
    padding: 17,
    borderRadius: 50,
    marginTop: 30
  },

  login_button_text:{
    textAlign: 'center',
    fontFamily: 'Momcake-Bold',
    fontSize: 35,
    color: 'white'
  },

  register_details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },

  no_account_text:{
    color: 'white',
    fontFamily: 'Champ-Bold',
    fontSize: 16
  },

  register_text:{
    fontFamily: 'Momcake-Bold',
    color: COLORS.purpleColor,
    fontSize: 20,
  },

  version_detail: {
    textAlign: 'center',
    color: COLORS.dWhiteColor,
    marginVertical: 5,
  }
  
});

