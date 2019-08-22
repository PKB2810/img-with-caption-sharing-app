import React,{Component} from 'react';
import {View, Text,TextInput,StyleSheet} from 'react-native'

const parentStyle= StyleSheet.create({
  container :{
    padding:10,
    flex:1,
    flexDirection:'column'
  }
})
class Name extends React.Component{
  constructor(props){
    super(props);
  }

  
  render(){
    return(
      <View style= {parentStyle.container}>
      <Name name={this.state.name} setName={this.setName}/>
      <Subject subject={this.state.subject} setSubject={this.setSubject}/>
      <Message message={this.state.message} setMessage={this.setMessage}/>
      <Button onPress={}/>
    </View>
    )
    
  }



}
export default Name