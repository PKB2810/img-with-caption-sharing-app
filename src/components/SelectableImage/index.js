import React from 'react';
import {Image} from 'react-native';

class SelectableImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  render() {
    return (
      <Image
        source={{uri: this.props.image.urls.small}}
        style={{
          width: 150,
          height: 150,
          borderWidth: 1,
          borderBottomColor: '#000000',
          borderTopColor: '#000000',
          borderLeftColor: '#000000',
          borderRightColor: '#000000',
          borderStyle: 'solid',
        }}
      />
    );
  }
}
export default SelectableImage;
