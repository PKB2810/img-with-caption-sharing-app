import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {CustomPicker} from 'react-native-custom-picker';
import SvgUri from 'react-native-svg-uri';

const downArrow = require('../../../public/images/down-arrow.svg');
const styles = StyleSheet.create({
  ddstyle: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 80,
  },
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderLeftColor: '#000000',
    borderRightColor: '#000000',
    borderStyle: 'solid',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
  },
});
class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  renderField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{selectedItem}</Text>
          <SvgUri width="10" height="20" source={downArrow} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <CustomPicker
        options={this.props.options}
        defaultValue={this.props.defaultValue}
        fieldTemplate={this.renderField}
        style={styles.ddstyle}
        onValueChange={itemValue => {
          this.props.setCurrentCategory(itemValue);
        }}
      />
    );
  }
}
export default DropdownPicker;
