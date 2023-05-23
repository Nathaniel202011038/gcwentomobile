import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AccountLandingPage({navigation}) {

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

const showConfirmDialog = () => {
  return Alert.alert(
    "LOGOUT",
    "Are you sure you want to LOGOUT?",
    [
      {
        text: "Yes",
        onPress: () => {
          navigation.navigate(ROUTES.LOGIN);
        },
      },
      {
        text: "No",
      },
    ]
  );
};

  return (
      <View style={styles.container} >
        <ScrollView vertical={true} style={styles.scrollview_container}>
          <View style={styles.second_row_container}>
            <Text style={styles.bigtext_header}> Account Management </Text>
            <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 110}}></View>
          </View>

          <View style={styles.content_row_container}>
            <TouchableOpacity style={styles.option_button} onPress={()=>navigation.navigate(ROUTES.ACCOUNTDETAILS)}>
                <Icon5
                    name="user-cog"
                    size={20}
                    color={COLORS.purpleColor}
                />
                <Text style={styles.option_button_text}>My Profile </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option_button} onPress={()=>navigation.navigate(ROUTES.ACCOUNTSTORIESTABNAVIGATOR)}>
                <Icon5
                    name="pencil-ruler"
                    size={20}
                    color={COLORS.purpleColor}
                />
                <Text style={styles.option_button_text}> My Stories </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option_button} onPress={()=>navigation.navigate(ROUTES.ACCOUNTBOOKMARKSTABNAVIGATOR)}>
                <FontAwesome
                    name="bookmark"
                    size={20}
                    color={COLORS.purpleColor}
                />
                <Text style={styles.option_button_text}> Bookmarks </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logout_button} onPress={() => showConfirmDialog()}>
            <Text style={styles.logout_button_text}> LOGOUT </Text>
          </TouchableOpacity>
          

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
    padding: 20,
    paddingBottom: 100,
  },

  bigtext_header: {
    fontFamily: 'Emotional',
    fontSize: 23,
    textAlign: 'center',
    color: COLORS.dWhiteColor,
  },

  content_row_container: {
    marginTop: 30,
    minHeight: 530,
  },

  option_button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 50,
    backgroundColor: COLORS.darkBgColor,
    borderRadius: 7,
    marginBottom: 7,
  },

  option_button_text: {
    color: COLORS.purpleColor,
    fontSize: 20,
    marginLeft: 30,
    fontFamily: 'Momcake-Bold',
  },

  logout_button: {
    padding: 15,
    backgroundColor: '#b33439',
    borderRadius: 7,
    marginTop: 40,
  },

  logout_button_text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Momcake-Bold',
  }



});
