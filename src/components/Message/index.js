import React,{Component} from 'react';
import {View, Text,TextInput,StyleSheet} from 'react-native'


const parentStyle= StyleSheet.create({
  container :{
    display:'flex',
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'space-between'
  }
  ,
  textboxStyle:{
     width:100, height:40,borderColor: 'gray', borderWidth: 1
  }
})
class Message extends React.Component{
  constructor(props){
    super(props);
  }

  
  render(){
    return(
      <View style= {parentStyle.container}>
      <Text>Message:</Text>
      <TextInput  style={parentStyle.textboxStyle} value={this.props.message} onChangeText={(text)=>this.props.setMessage(text)} multiline={true} numberOfLines={10}></TextInput>
    </View>
    )
  }
}
export default Message