import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Image} from 'react-native';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { ROUTES } from '../../constants/routes';
import { useFocusEffect } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import { img_url } from '../../constants/url';
import axios from 'axios';
import { baseUrl } from '../../constants/url';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountDetails({navigation, route}) {
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [penname, setPenname] = React.useState("");

  const [profile, setProfile] = useState([]);

  const [image, setImagePath] = useState(null);
  const data = new FormData();

  AsyncStorage.getItem("userId");

  _pickDocument = async () => {
    user_id = await AsyncStorage.getItem("userId");
    let result = await DocumentPicker.getDocumentAsync({});

    setImagePath(result.uri);
    // console.log(result);

    data.append("file", {
      name: result.name,
      type: result.mimeType,
      uri: result.uri,
    });

    await axios
      .post(`${baseUrl}editUserPic/${user_id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response.data));
  };


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
          setImagePath(img_url+response.data.payload[0].user_dp)
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

      <View style={imageUploaderStyles.container}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150 }}
          />
        )}
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
              onPress={_pickDocument}
              style={imageUploaderStyles.uploadBtn}
            >
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 25, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
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

      <View style={{marginTop: 25, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
        <View>
          <Text style={{ textAlign: 'center', color: COLORS.purpleColor, fontSize: 22, fontFamily: 'Momcake-Bold'}}> Account Information </Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.purpleColor}} />
      </View>

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

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: COLORS.darkerBgColor,
    position: "relative",
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 20,
    alignSelf: 'center'
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.purpleColor,
    width: "100%",
    height: 40,
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

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
    marginTop: 30,
    marginBottom: 30,
  },

  save_button_text:{
    textAlign: 'center',
    fontFamily: 'Momcake-Bold',
    fontSize: 20,
    color: 'white',
  },

});