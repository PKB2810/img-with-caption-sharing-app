/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const shareIcon = require('../../../public/images/share.svg');

export interface Props{
  shareMessage:() => void
}
const ShareButton = ({ shareMessage }:Props) => (
  <TouchableOpacity onPress={shareMessage}>
    <View
      style={{
        width: 200,
        height: 40,
        borderWidth: 1,
        borderBottomColor: '#000000',
        borderTopColor: '#000000',
        borderLeftColor: '#000000',
        borderRightColor: '#000000',
        borderStyle: 'solid',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <SvgUri width="30" height="30" source={shareIcon} />
      <Text
        style={{
          color: '#000000',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
            Share
      </Text>
    </View>
  </TouchableOpacity>
);


export default ShareButton;
