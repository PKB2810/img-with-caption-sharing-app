import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';

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
const  Subject = ({setSubject,subject}) => {
  

  
    return (
      <View style={parentStyle.container}>
        <Text>Subject:</Text>
        <TextInput
          style={parentStyle.textboxStyle}
          value={subject}
          onChangeText={(text) => setSubject(text)}
         />
      </View>
    );
  }

export default Subject;
