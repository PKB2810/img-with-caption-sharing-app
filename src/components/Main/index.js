import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import ShareButton from '../ShareButton';
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
    if (newCategory === this.state.currentCategory) return;
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
          keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0}>
          <ScrollView style={parentStyle.container}>
            <View style={parentStyle.inner}>
              <View style={{marginTop: Platform.OS === 'android' ? 20 : 80}}>
                <DropdownPicker
                  options={this.state.categories}
                  defaultValue={this.state.currentCategory}
                  setCurrentCategory={this.setCurrentCategory}
                />
              </View>
              <Image
                source={{uri: this.state.imageBlob}}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderBottomColor: '#000000',
                  borderTopColor: '#000000',
                  borderLeftColor: '#000000',
                  borderRightColor: '#000000',
                  borderStyle: 'solid',
                  marginTop: Platform.OS === 'android' ? 20 : 80,
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: Platform.OS === 'android' ? 40 : 80,
                }}>
                <Message
                  message={this.state.message}
                  setMessage={this.setMessage}
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: Platform.OS === 'android' ? 60 : 80,
                }}>
                <ShareButton shareMessage={this.shareMessage} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
export default MainPage;
