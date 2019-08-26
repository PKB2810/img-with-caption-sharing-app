import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  ActivityIndicator,
  Picker,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import {searchImages} from '../../Api/searchImages';
import {getBlobForImage} from '../../Api/getBlobForImage';
import {
  GOOD_MORNING,
  BIRTHDAY,
  POSITIVE_QUOTES,
} from '../../constants/image_categories';
import Message from '../Message';
import DropdownPicker from '../DropdownPicker';
const background = require('../../../public/images/background.jpg');
const parentStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  element: {
    marginTop: 20,
  },
  inner: {
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  loader: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
});

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subject: '',
      message: '',
      uri: '',
      imageBlob: '',
      images: [],
      isLoading: true,
      currentCategory: GOOD_MORNING,
      categories: [GOOD_MORNING, BIRTHDAY, POSITIVE_QUOTES],
    };
  }

  componentDidMount() {
    this.fetchData(this.state.currentCategory);
  }

  fetchData = async newCategory => {
    const data = await searchImages(newCategory);
    const uri = data[Math.floor(Math.random() * data.length)].urls.small;
    const imageBlob = await getBlobForImage(uri);

    this.setState({
      images: data,
      uri: uri,
      imageBlob: 'data:image/jpeg;base64,' + imageBlob,
      isLoading: false,
    });
  };

  setName = name => {
    this.setState({name: name});
  };
  setSubject = subject => {
    this.setState({subject: subject});
  };

  setMessage = message => {
    this.setState({message: message});
  };
  setCurrentCategory = newCategory => {
    this.setState({currentCategory: newCategory, isLoading: true});
    this.fetchData(newCategory);
  };

  shareMessage = () => {
    Share.open({
      message: this.state.message,
      url: this.state.imageBlob,
      title: this.state.subject,
    }).then(result => {
      console.log('result shared');
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={parentStyle.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1}}
          keyboardVerticalOffset={-500}>
          <ScrollView style={parentStyle.container}>
            <View style={parentStyle.inner}>
              <DropdownPicker
                options={this.state.categories}
                defaultValue={this.state.currentCategory}
                setCurrentCategory={this.setCurrentCategory}
              />
              <Image
                source={{uri: this.state.imageBlob}}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
              <Message
                message={this.state.message}
                setMessage={this.setMessage}
              />
              <View style={{marginTop: 20, alignSelf: 'center'}}>
                <TouchableOpacity onPress={this.shareMessage}>
                  <View
                    style={{
                      width: 200,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'orange',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginLeft: 100,
                        marginRight: 100,
                      }}>
                      Share
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
export default MainPage;
