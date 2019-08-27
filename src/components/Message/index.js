import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const parentStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 80,
  },
  textboxStyle: {
    width: 200,
    maxHeight: 90,
    overflow: 'scroll',
    borderWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderLeftColor: '#000000',
    borderRightColor: '#000000',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
  },
});
class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextInput
        placeholder="Type your message"
        style={parentStyle.textboxStyle}
        value={this.props.message}
        onChangeText={text => this.props.setMessage(text)}
        multiline={true}
      />
    );
  }
}
export default Message;
