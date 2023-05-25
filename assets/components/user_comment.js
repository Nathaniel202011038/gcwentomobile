import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../constants/colors';

import { img_url } from '../constants/url';

export default function UserComment ({data}) {

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
                <View style={styles.content_container}> 

                <View style={styles.user_image_name_date_container}>
                    <Image
                        style={styles.user_image}
                        source={{uri: img_url+item.user_dp}}
                    />
                    <View style={styles.name_date_container}>
                        <Text style={styles.user_penname}> {item.user_penname} </Text>
                        <Text style={styles.comment_date}> {item.created_at} </Text>
                    </View>
                </View>

                <Text style={styles.comment_content}>{item.comment_content} </Text>

                </View>
            )
        }}/>
    );
}

const styles = StyleSheet.create({
    content_container: {
        backgroundColor: COLORS.darkBgColor,
        borderRadius: 7,
        paddingHorizontal: 15,
        paddingBottom: 13,
        marginBottom: 7,
        elevation: 6, 
    },

    user_image_name_date_container:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    name_date_container: {
        marginLeft: 7, 
    },

    user_image: {
        width: 35,
        height: 35,
        borderRadius: 100,
        marginTop: 10,
    },

    user_penname: {
        fontFamily: 'Momcake-Bold',
        fontSize: 18,
        color: COLORS.dWhiteColor,
    },

    comment_date: {
        fontFamily: 'Champ-Bold',
        fontSize: 10,
        color: COLORS.dWhiteColor,
    },

    comment_content: {
        fontFamily: 'Champ-Bold',
        textAlign: 'justify',
        color: COLORS.textColor,
        marginLeft: 45,
        fontSize: 15,
    },
});