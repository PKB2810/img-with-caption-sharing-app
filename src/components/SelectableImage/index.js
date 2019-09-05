/* eslint-disable react/prop-types */
import React from 'react';
import {
  Image, TouchableOpacity, View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

const SelectableImage = ({ setSelectedImage, isSelected, image }) => (
  <TouchableOpacity
    onPress={() => {
      setSelectedImage(image);
      Navigation.popToRoot('MainPage');
    }}
  >
    {isSelected ? (
      <Image
        source={require('../../../public/images/tick.jpg')}
        style={{
          position: 'absolute',
          borderRadius: 10,
          zIndex: 9999,
          top: 15,
          left: 15,
          width: 20,
          height: 20,
          backgroundColor: 'white',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 2,
        }}
      />
    ) : (
      <View
        style={{
          position: 'absolute',
          borderRadius: 10,
          zIndex: 9999,
          top: 15,
          left: 15,
          width: 20,
          height: 20,
          backgroundColor: 'white',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 2,
        }}
      />
    )}
    <Image
      source={{ uri: image.urls.small }}
      style={{
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: '#d8d8d8',
        borderStyle: 'solid',
        borderRadius: 15,
      }}
    />
  </TouchableOpacity>
);

export default SelectableImage;
