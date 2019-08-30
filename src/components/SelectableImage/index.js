import React from 'react';
import {Image, TouchableOpacity, View, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';

class SelectableImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setSelectedImage(this.props.image);
          Navigation.popToRoot('MainPage');
        }}>
        {this.props.isSelected ? (
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
            }}></Image>
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
            }}></View>
        )}
        <Image
          source={{uri: this.props.image.urls.small}}
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
  }
}
export default SelectableImage;
