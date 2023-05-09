import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function AccountDetails() {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 10, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
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
        />
      </View>

      <Text style={styles.label}> Last Name </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit last name here..." placeholderTextColor="#E5E5E5"
        />
      </View>

      <View style={{marginTop: 25, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
        <View>
          <Text style={{ textAlign: 'center', color: COLORS.purpleColor, fontSize: 22, fontFamily: 'Momcake-Bold'}}> Account Information </Text>
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

      <Text style={styles.label}> Email </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit email here..." placeholderTextColor="#E5E5E5"
        />
      </View>

      <Text style={styles.label}> Password </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit password here..." placeholderTextColor="#E5E5E5"
        />
      </View>

      <Text style={styles.label}> Pen Name </Text>
      <View style={styles.input_container}> 
        <TextInput
          style={styles.form_input}
          placeholder="Edit pen name here..." placeholderTextColor="#E5E5E5"
        />
      </View>

      <TouchableOpacity style={styles.save_button}>
          <Text style={styles.save_button_text}> SAVE </Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBgColor,
    padding: 20,
    height: 'auto',
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
    marginTop: 40
  },

  save_button_text:{
    textAlign: 'center',
    fontFamily: 'Momcake-Bold',
    fontSize: 20,
    color: 'white'
  },

});