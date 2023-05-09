import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DeleteButton = () => {
  const [state, setState] = useState(false);

  const click = () => {
    setState(!state);
  };


  return (
    <View>
      <TouchableOpacity onPress={() => click()}>
      <Icon
        name= {state ? 'trash' : 'trash-o'}
        size={28}
        color={'red'}
      />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteButton;