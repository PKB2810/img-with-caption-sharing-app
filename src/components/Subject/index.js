import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const parentStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  textboxStyle: {
    width: 100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
class Subject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={parentStyle.container}>
        <Text>Subject:</Text>
        <TextInput
          style={parentStyle.textboxStyle}
          value={this.props.subject}
          onChangeText={text => this.props.setSubject(text)}></TextInput>
      </View>
    );
  }
}
export default Subject;
