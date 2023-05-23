import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../constants/colors';
import StarButton from './star';
import BookmarkButton from './bookmark';
import { ROUTES } from '../constants/routes';
import { img_url } from '../constants/url';

export default function BookmarksFilter ({data, input, setInput, navigation}) {

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
                  <Image
                      style={styles.content_image_container}
                      source={{uri: img_url+item.story_dp}}
                  />
                  <View style={styles.content_details_container}>
                      <View style={styles.content_title_author_details_container}> 
                        <Text style={styles.content_title}> {item.story_title} </Text>
                        <Text style={styles.content_detail}> AUTHOR: <Text style={styles.content_highlighter}> {item.user_penname} </Text></Text>
                        <Text style={styles.content_detail}> CATEGORY: <Text style={styles.content_highlighter}> {item.story_category} </Text></Text>
                        
                        <View style={styles.star_count_container}>
                          <StarButton data={item.id}/>
                          <Text style={styles.story_star_count}> {item.story_star} </Text>
                        </View>
                      </View>

                      <View style={styles.bookmark_container}>
                          <BookmarkButton data={item.id}/>
                      </View>
                  </View>

                  <View style={styles.content_buttons_container}>
                      <TouchableOpacity style={styles.comments_button} onPress={()=>navigation.navigate(ROUTES.ACCOUNTBOOKMARKSCOMMENTS, item)}>
                        <Text style={styles.comments_button_text}> COMMENTS </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.read_button} onPress={()=>navigation.navigate(ROUTES.ACCOUNTBOOKMARKSCONTENTS, item)}>
                        <Text style={styles.read_button_text}> READ </Text>
                      </TouchableOpacity>
                  </View>
                </View>
                )
            }
            if(item.story_title.toLowerCase().includes(input.toLowerCase())) {
                return ( 
                  <View style={styles.content_container}>
                  <Image
                      style={styles.content_image_container}
                      source={{uri: img_url+item.story_dp}}
                  />
                  <View style={styles.content_details_container}>
                      <View style={styles.content_title_author_details_container}> 
                        <Text style={styles.content_title}> {item.story_title} </Text>
                        <Text style={styles.content_detail}> AUTHOR: <Text style={styles.content_highlighter}> {item.user_penname} </Text></Text>
                        <Text style={styles.content_detail}> CATEGORY: <Text style={styles.content_highlighter}> {item.story_category} </Text></Text>
                        
                        <View style={styles.star_count_container}>
                          <StarButton data={item.id}/>
                          <Text style={styles.story_star_count}> {item.story_star} </Text>
                        </View>
                      </View>

                      <View style={styles.bookmark_container}>
                          <BookmarkButton data={item.id}/>
                      </View>
                  </View>

                  <View style={styles.content_buttons_container}>
                      <TouchableOpacity style={styles.comments_button} onPress={()=>navigation.navigate(ROUTES.ACCOUNTBOOKMARKSCOMMENTS, item)}>
                        <Text style={styles.comments_button_text}> COMMENTS </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.read_button} onPress={()=>navigation.navigate(ROUTES.ACCOUNTBOOKMARKSCONTENTS, item)}>
                        <Text style={styles.read_button_text}> READ </Text>
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
    
      content_container: {
        backgroundColor: COLORS.bgColor,
        minHeight: 250,
        borderRadius: 10,
        elevation: 6, 
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.darkerBgColor
      },
    
      content_image_container: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: COLORS.darkerBgColor,
      },
    
      content_details_container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
    
      content_title: {
        fontFamily: 'Emotional',
        fontSize: 18,
        color: COLORS.dWhiteColor
      },
    
      content_detail: {
        fontFamily: 'Momcake-Bold',
        color: COLORS.dWhiteColor,
        fontSize: 16,
        marginLeft: 15
      },
    
      content_highlighter: {
        fontFamily: 'Champ-Bold',
        color: COLORS.textColor
      },
    
      content_buttons_container: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
    
      comments_button: {
        borderWidth: 2,
        borderColor: COLORS.purpleColor,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      comments_button_text: {
        fontSize: 16,
        fontFamily: 'Momcake-Bold',
        color: COLORS.purpleColor
      },
    
      read_button:{
        borderWidth: 2,
        borderColor: COLORS.purpleColor,
        backgroundColor: COLORS.purpleColor,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      read_button_text: {
        fontSize: 16,
        fontFamily: 'Momcake-Bold',
        color: 'white'
      },
    
      bookmark_container: {
        marginRight: 10
      },

      star_count_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },

      story_star_count: {
        fontFamily: 'Momcake-Bold',
        color: COLORS.purpleColor,
        fontSize: 18,
      }
});