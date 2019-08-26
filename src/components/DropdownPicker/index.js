import React from 'react';
import {StyleSheet} from 'react-native';
import {CustomPicker, View, Text} from 'react-native-custom-picker';

const styles = StyleSheet.create({
  ddstyle: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 15,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 18,
  },
});
class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  renderField = settings => {
    const {selectedItem, defaultText} = settings;
    console.log(selectedItem);

    return (
      <View style={styles.container}>
        {/* <View>
          {selectedItem ? (
            <View style={styles.innerContainer}>
              <Text style={styles.text}>{selectedItem}</Text>
            </View>
          ) : null}
        </View> */}
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
