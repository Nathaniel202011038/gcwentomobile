import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import {useFonts} from 'expo-font';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { FONTSIZE } from '../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TermsAndConditions(props) {

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
      <View style={styles.container}>

      <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.LOGIN)} style={{color: COLORS.purpleColor, position: 'absolute', top: 38, left: 20,}}>
        <Icon
          name="ios-return-up-back-sharp"
          size={30}
          color={COLORS.purpleColor}
        />
      </TouchableOpacity>

      <Text style={styles.pg_header}> Terms and Conditions </Text>

      <View style={styles.contents_container}>
        <Text style={styles.contents_text}>{'\t'}{'\t'}{'\t'}Welcome to GCwento platform, owned and created by Nathaniel E. Ribada of BSIT 3B. These terms and conditions are a contract between you and GCwento.  
        </Text>
        <Text style={styles.contents_text}>{'\t'}{'\t'}{'\t'}By using GCwento, creating your account and using the mobile application to create your own stories and comment anything on other's published stories, or to access and view GCwento contents, you’re agreeing with our Terms and Conditions. If you don’t agree to any of these terms, you can’t use the GCwento Services.
        </Text>

        <View style={{marginTop: 30, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
          <View>
            <Text style={{ textAlign: 'center', color: COLORS.dWhiteColor, fontSize: 22, fontFamily: 'Momcake-Bold'}}> Things to Consider </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: COLORS.dWhiteColor}} />
        </View>

        <View style={styles.list_container}>
          <View style={styles.list_item}>
            <View style={styles.title_icon_container}>
              <Image
                style={styles.text_icon}
                source={require('../../user_icon.png')}
              />
              <Text style={styles.contents_title}> You Need an Account </Text>
            </View>

            <Text style={styles.contents_text_list}>{'\t'}{'\t'}{'\t'}To get the most out of GCwento, you’ll need to register, choose an account name, and set a password.
            </Text>
          </View>

          <View style={styles.list_item}>
            <View style={styles.title_icon_container}>
              <Image
                style={styles.text_icon}
                source={require('../../copyright_icon.png')}
              />
              <Text style={styles.contents_title}> Your Content is Yours </Text>
            </View>

            <Text style={styles.contents_text_list}>{'\t'}{'\t'}{'\t'}You own all the rights to the content you create and post in this platform. Of course, if the content wasn’t yours to begin with, putting it in GCwento doesn’t make it yours. Don’t submit content you don’t hold the copyright for (unless you have permission, including to grant GCwento all the rights outlined in these terms).
            </Text>
          </View>

          <View style={styles.list_item}>
            <View style={styles.title_icon_container}>
              <Image
                style={styles.text_icon}
                source={require('../../law_icon.png')}
              />
              <Text style={styles.contents_title}> Don’t break the law </Text>
            </View>

            <Text style={styles.contents_text_list}>{'\t'}{'\t'}{'\t'}Don’t take any action that infringes or violates other people’s rights, violates the law, or breaches any contract or legal duty you have toward anyone.
            </Text>
          </View>

          <View style={styles.list_item}>
            <View style={styles.title_icon_container}>
              <Image
                style={styles.text_icon}
                source={require('../../harm_icon.png')}
              />
              <Text style={styles.contents_title}>Don’t harm anyone’s computer </Text>
            </View>

            <Text style={styles.contents_text_list}>{'\t'}{'\t'}{'\t'}Don’t distribute software viruses, or anything else (code, films, programs) designed to interfere with the proper function of any software, hardware, or equipment on the application (whether it belongs to GCwento or anyone else).
            </Text>
          </View>

          <View style={styles.list_item}>
            <View style={styles.title_icon_container}>
              <Image
                style={styles.text_icon}
                source={require('../../steal_icon.png')}
              />
              <Text style={styles.contents_title}>Don’t steal GCwento’s valuable intellectual property </Text>
            </View>

            <Text style={styles.contents_text_list}>{'\t'}{'\t'}{'\t'}Don’t take apart or reverse engineer any aspect of application or Services in an effort to access things like source code, underlying ideas, or algorithms.
            </Text>
          </View>
        </View>
      </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: 'center',
    paddingTop: 37,
  },

  pg_header: {
    fontFamily: 'Emotional',
    color: COLORS.dWhiteColor,
    fontSize: 25,
    marginTop: 40
  },

  contents_container:{
    marginTop: 14,
    backgroundColor: COLORS.darkBgColor,
    width: '100%',
    padding: 20,
    paddingTop: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  contents_text: {
    fontFamily: 'Champ-Bold',
    textAlign: 'justify',
    fontSize: 16,
    color: COLORS.textColor,
  },

  contents_text_list: {
    fontFamily: 'Champ-Bold',
    textAlign: 'justify',
    fontSize: 16,
    color: COLORS.textColor,
    paddingLeft: 50
  },

  list_container: {
    marginTop: 15,
    marginBottom: 10,
  },

  title_icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  text_icon: {
    width: 40,
    height: 40,
  },

  contents_title: {
    fontSize: FONTSIZE.champNormal,
    color: COLORS.purpleColor,
    marginLeft: 10,
    width: '85%',
    fontFamily: 'Champ-Bold',
    fontSize: 18
  },

  list_item: {
    flexDirection: 'column',
    marginBottom: 15,
  },


});
