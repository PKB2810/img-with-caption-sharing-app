import React,{Component} from 'react';
import {View,StyleSheet,Button,ScrollView,Image} from 'react-native'
import Share from 'react-native-share'
import RNFetchBlob from 'react-native-fetch-blob'
import goodMorning from '../../../public/images/good-morning.jpg'
import Message from '../Message'


const parentStyle= StyleSheet.create({
  container :{
    padding:10,
    flexDirection:'column',
    justifyContent:'space-evenly',
    height:'100%'
  }
})

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state= {name:'', subject:'', message:'',uri:'',imageBlob:''}
  }
  componentDidMount(){
    fetch('https://api.unsplash.com/search/photos/?client_id=c38fc616b36e1aff11a174fda29799d96689058b555e8657684472011d02b4e7&query=goodmorning').then((response) =>{
     return response.json()
    }).then((data) =>{
      console.log(data);    } )
      this.setState({uri:'https://images.unsplash.com/photo-1449173516421-66fc1d2aa206?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjg4MTMwfQ'},()=>{
        RNFetchBlob.fetch('GET', this.state.uri)
       .then(resp => {
       console.log('response : ', resp);
       console.log(resp.data);
       let base64image = resp.data;
       this.setState({imageBlob:'data:image/jpeg;base64,'+ base64image})
   })
    .catch(err => console.log(err));
      })
  }

  setName = (name) => {
    this.setState({name:name});
  }
  setSubject = (subject) => {
    this.setState({subject:subject});
  }

  setMessage = (message) => {
    
    this.setState({message:message});
  }
  shareMessage = () => {
    Share.open({message:this.state.message,url:this.state.imageBlob
    , title:this.state.subject}).then((result) =>{
        console.log('result shared')
    })
  }
  render(){
    return(
      
        <View style= {parentStyle.container}>
         <Image source={{uri:this.state.uri}} style={{width:200,height:200,alignSelf:'center'}}/>
          <Message message={this.state.message} setMessage={this.setMessage}/>
          <Button title='Share' onPress={this.shareMessage}/>
        </View>
      
    )
  }


}
export default MainPage
