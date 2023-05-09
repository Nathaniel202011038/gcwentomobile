import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import SearchAuthor from '../screens/home/search_author';
import Publish from '../screens/home/publish';
import Leaderboard from '../screens/home/leaderboard';
import Account from '../screens/home/account';
import { ROUTES } from '../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../constants/colors';
import HomeTabNavigator from './HomeTabNavigator';
import LeaderboardTabNavigator from './LeaderboardTabNavigator';
import SearchAuthorNavigator from './SearchAuthorNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.darkBgColor,
          borderTopWidth: 2,
          borderTopColor: COLORS.darkerBgColor,
          height: 58
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name={ROUTES.HOMETABNAVIGATOR} component={HomeTabNavigator} 
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: COLORS.darkerBgColor,

          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon5
                name="home"
                size={20}
                color={focused ? COLORS.purpleColor : COLORS.dWhiteColor}
              />
              
            </View>
          ),
        }}
      />

      <Tab.Screen name={ROUTES.SEARCHAUTHORNAVIGATOR} component={SearchAuthorNavigator} 
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: COLORS.darkerBgColor,

          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon5
                name="user-edit"
                size={20}
                color={focused ? COLORS.purpleColor : COLORS.dWhiteColor}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name={ROUTES.PUBLISH} component={Publish} 
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: COLORS.darkerBgColor,

          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon5
                name="pencil-ruler"
                size={20}
                color={focused ? COLORS.purpleColor : COLORS.dWhiteColor}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name={ROUTES.LEADERBOARDTABNAVIGATOR} component={LeaderboardTabNavigator} 
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: COLORS.darkerBgColor,

          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon5
                name="star-half-alt"
                size={20}
                color={focused ? COLORS.purpleColor : COLORS.dWhiteColor}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name={ROUTES.ACCOUNT} component={Account} 
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: COLORS.darkerBgColor,

          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon
                name="user-circle-o"
                size={20}
                color={focused ? COLORS.purpleColor : COLORS.dWhiteColor}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default BottomTabNavigator;