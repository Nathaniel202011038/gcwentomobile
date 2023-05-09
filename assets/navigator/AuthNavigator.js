import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import TermsAndConditions from '../screens/auth/terms_conditions';
import Account from '../screens/home/account';
import { ROUTES } from '../constants/routes';
import BottomTabNavigator from '../navigator/BottomTabNavigator';
import StoryContent from '../screens/home/story_content';

const Stack = createStackNavigator();

function AuthNavigator() {

    console.log(Stack);
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
      }}
      initialRouteName={ROUTES.LOGIN}>

        <Stack.Screen name={ROUTES.LOGIN} component={Login}/>
        <Stack.Screen name={ROUTES.REGISTER} component={Register}/>
        <Stack.Screen name={ROUTES.TERMSANDCONDITIONS} component={TermsAndConditions}/>
        <Stack.Screen name={ROUTES.BOTTOMTABNAVIGATOR} component={BottomTabNavigator}/>
        <Stack.Screen name={ROUTES.ACCOUNT} component={Account}/>

    </Stack.Navigator>


  );
}

export default AuthNavigator;












































// import { StyleSheet, Text, View} from 'react-native';
// import React from 'react'; 


// const AuthNavigator = () => {
//     return (
//         <View>
//             <Text> AuthNavigator </Text>
//         </View>
//     );
// };

// export default AuthNavigator;

// const styles = StyleSheet.create({


// });