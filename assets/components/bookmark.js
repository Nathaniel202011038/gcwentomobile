import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';

const BookmarkButton = () => {
  const [state, setState] = useState(false);

  const click = () => {
    setState(!state);
  };


  return (
    <View>
      <TouchableOpacity onPress={() => click()}>
      <Icon
        name= {state ? 'bookmark' : 'bookmark-o'}
        size={28}
        color={COLORS.purpleColor}
      />
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkButton;