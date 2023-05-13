import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import AccountTopTabNavigator from '../../navigator/AccountTopTabNavigator';


export default function Account() {

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
    <View style={styles.container}>
      <ScrollView vertical={true} style={styles.scrollview_container}>

        <View style={styles.second_row_container}>
            <Text style={styles.bigtext_header}> Account Management </Text>

            <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 110}}></View>
        </View>

        <View style={styles.content_row_container}>

        <AccountTopTabNavigator/>
        
        </View>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: COLORS.bgColor,
  },

  scrollview_container: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'none'
  },

  bigtext_header: {
    fontFamily: 'Emotional',
    fontSize: 23,
    textAlign: 'center',
    color: COLORS.dWhiteColor,
  },

  content_row_container: {
    marginTop: 20,
    minHeight: 900,
  },


});
