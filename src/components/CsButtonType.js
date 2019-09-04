import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import Fonts from '../utils/fonts';
const CsButtonType = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 12,
          paddingBottom: 12,
          backgroundColor: props.color ? props.color : '#24d0d0',
          marginLeft: 2,
          marginRight: 2,
          borderRadius: 8,
        },
        props.style,
      ]}>
      <Text style={{color: '#fff', fontFamily: Fonts.CabinBold}}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default CsButtonType;
