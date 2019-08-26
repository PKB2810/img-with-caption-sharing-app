import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const parentStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textboxStyle: {
    width: 200,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
});
class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={parentStyle.container}>
        <TextInput
          placeholder="Type your message"
          style={parentStyle.textboxStyle}
          value={this.props.message}
          onChangeText={text => this.props.setMessage(text)}
          multiline={true}
          numberOfLines={10}
        />
      </View>
    );
  }
}
export default Message;
