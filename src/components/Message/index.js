import React from 'react';
import { TextInput, Platform, StyleSheet } from 'react-native';

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
class Message extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { message, setMessage } = this.props;
    return (
      <TextInput
        placeholder="Type your message"
        style={parentStyle.textboxStyle}
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
      />
    );
  }
}
export default Message;
