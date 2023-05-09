import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/routes';

export default function AuthorFilter ({data, input, setInput, navigation}) {

    let [fontsLoaded] = useFonts({
        'Momcake-Bold': require('../fonts/Momcake-Bold.otf'),
        'Momcake-Light': require('../fonts/Momcake-Light.otf'),
        'Emotional': require('../fonts/Emotional.ttf'),
        'Champ-Bold': require('../fonts/Champ-Bold.ttf'),
        'Champ-Light': require('../fonts/Champ-Light.ttf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return (
        <FlatList scrollEnabled={false} data={data} renderItem={({item}) => {
            if(input === "") {
               return ( 
                <View style={styles.content_container}>
                    <View style={styles.author_container}>
                        <View style={styles.author_quick_details_container}>
                            <Image
                                style={styles.user_image}
                                source={item.user_image}
                            />
                            <View style={styles.author_details}>
                                <Text style={styles.author_name}> {item.author_name} </Text>
                                <Text style={styles.author_stories_count}> Stories Published: {item.story_star_count} </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.visit_button} onPress={()=>navigation.navigate(ROUTES.SEARCHAUTHORPROFILE)}>
                            <Text style={styles.visit_button_text}> VISIT </Text>
                        </TouchableOpacity>
                    </View>
                </View>
              )
            }
            if(item.author_name.toLowerCase().includes(input.toLowerCase())) {
                return ( 
                <View style={styles.content_container}>
                    <View style={styles.author_container}>
                        <View style={styles.author_quick_details_container}>
                            <Image
                                style={styles.user_image}
                                source={item.user_image}
                            />
                            <View style={styles.author_details}>
                                <Text style={styles.author_name}> {item.author_name} </Text>
                                <Text style={styles.author_stories_count}> Stories Published: {item.story_star_count} </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.visit_button} onPress={()=>navigation.navigate(ROUTES.SEARCHAUTHORPROFILE)}>
                            <Text style={styles.visit_button_text}> VISIT </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                 )
             }
        
        }}/>
        
    );
}

const styles = StyleSheet.create({
    content_row_container: {
        marginTop: 5,
        minHeight: 900,
        paddingBottom: 30
      },

      user_image: {
        width: 35,
        height: 35
      },
    
      author_container: {
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        borderColor: COLORS.darkerBgColor,
        backgroundColor: COLORS.darkBgColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 6
      },
    
      author_quick_details_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      author_details:{
        marginLeft: 5
      },
    
      author_name: {
        fontFamily: 'Champ-Bold',
        color: COLORS.dWhiteColor,
        fontSize: 16
      },
    
      author_stories_count: {
        fontFamily: 'Champ-Bold',
        color: COLORS.purpleColor,
        fontSize: 16
      },
    
      visit_button:{
        borderWidth: 2,
        borderColor: COLORS.purpleColor,
        backgroundColor: COLORS.purpleColor,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      visit_button_text: {
        fontSize: 16,
        fontFamily: 'Momcake-Bold',
        color: 'white'
      },
});