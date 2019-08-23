import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  ActivityIndicator,
  Picker,
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

const parentStyle = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
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
    };
  }

  async componentDidMount() {
    const data = await searchImages(this.state.currentCategory);
    const uri = data[Math.floor(Math.random() * data.length)].urls.raw;
    const imageBlob = await getBlobForImage(uri);

    this.setState({
      images: data,
      uri: uri,
      imageBlob: 'data:image/jpeg;base64,' + imageBlob,
      isLoading: false,
    });
  }

  fetchData = async newCategory => {
    const data = await searchImages(newCategory);
    const uri = data[Math.floor(Math.random() * data.length)].urls.raw;
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
      <View style={parentStyle.container}>
        <Picker
          selectedValue={this.state.currentCategory}
          style={{height: 50, width: 200, alignSelf: 'center'}}
          onValueChange={itemValue => {
            this.setCurrentCategory(itemValue);
          }}>
          <Picker.Item label="Good Morning" value={GOOD_MORNING} />
          <Picker.Item label="Birthday" value={BIRTHDAY} />
          <Picker.Item label="Positive Quotes" value={POSITIVE_QUOTES} />
        </Picker>
        <Image
          source={{uri: this.state.imageBlob}}
          style={{width: 200, height: 200, alignSelf: 'center'}}
        />
        <Message message={this.state.message} setMessage={this.setMessage} />
        <Button title="Share" onPress={this.shareMessage} />
      </View>
    );
  }
}
export default MainPage;
