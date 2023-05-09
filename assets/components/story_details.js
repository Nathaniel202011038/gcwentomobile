import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function StoryDetails ({data}) {

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
            return (
                <View style={styles.story_whole_content_container}> 
                    <View style={styles.story_title_container}>
                        <Text style={styles.bigtext_header}> {item.story_title} </Text>
                        <View style={{width: '40%', height: 3, backgroundColor: COLORS.dWhiteColor, borderRadius: 40, marginTop: 5, marginLeft: 100}}></View>
                    </View>
                    <View style={styles.story_content_container}>
                        <View style={styles.story_date_container}>
                            <Icon style={{color: COLORS.grayColor}}
                                name="calendar"
                                size={15}
                            />
                            <Text style={styles.story_date_value}>{item.story_date_value}</Text>
                        </View>

                        <View style={styles.story_brief_details}>
                            <Text style={styles.story_detail}>AUTHOR: <Text style={styles.story_detail_value}>{item.story_author}</Text></Text>
                            <Text style={styles.story_detail}>CATEGORY: <Text style={styles.story_detail_value}>{item.story_category}</Text></Text>
                        </View>

                        <Image
                            style={styles.story_image}
                            source={item.story_image}
                        />

                        <Text style={styles.story_content}>{item.story_content}</Text>
                    </View>
                </View>
            )
        }}/>
    );
}

const styles = StyleSheet.create({
    content_container: {
        backgroundColor: COLORS.darkBgColor,
        borderRadius: 7,
        paddingVertical: 10,
        paddingHorizontal: 15,
        paddingBottom: 13,
        marginBottom: 7,
        elevation: 6, 
    },

    bigtext_header: {
        fontFamily: 'Emotional',
        fontSize: 25,
        textAlign: 'center',
        color: COLORS.dWhiteColor,
    },

    story_detail: {
        fontFamily: 'Momcake-Bold',
        color: COLORS.dWhiteColor,
        fontSize: 15,
      },
    
    story_content_container: {
        borderRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 15,
        backgroundColor: COLORS.darkBgColor,
        minHeight: 550,
        marginTop: 20,
        marginBottom: 40,
    },

    story_detail_value: {
        fontFamily: 'Champ-Bold',
        color: COLORS.textColor
    },

    story_date_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    story_date_value: {
        fontFamily: 'Champ-Bold',
        color: COLORS.grayColor,
        marginLeft: 5,
    },

    story_image: {
        width: '100%',
        height: 100,
        marginVertical: 15,
    },

    story_content: {
        fontFamily: 'Champ-Bold',
        fontSize: 15,
        color: COLORS.textColor,
        textAlign: 'justify',
    },
});
