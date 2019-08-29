import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import ShareButton from '../ShareButton';
import Share from 'react-native-share';
import Message from '../Message';
import DropdownPicker from '../DropdownPicker';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {
  setMessage,
  setCurrentCategory,
  setEmptyImages,
} from '../../redux/actionCreators';
import {fetchImages} from '../../redux/fetchImages';

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

mapStateToProps = state => {
  return {
    uri: state.uri,
    imageBlob: state.imageBlob,
    images: state.images,
    isLoading: state.isLoading,
    currentCategory: state.currentCategory,
    categories: state.categories,
  };
};

mapDispatchToProps = dispatch => {
  return {
    setMessage: message => dispatch(setMessage(message)),
    setCurrentCategory: category => dispatch(setCurrentCategory(category)),
    fetchImages: category => dispatch(fetchImages(category)),
    setEmptyImages: () => dispatch(setEmptyImages()),
  };
};
class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchImages(this.props.currentCategory);
  }

  setMessage = message => {
    this.props.setMessage(message);
  };
  setCurrentCategory = newCategory => {
    if (newCategory === this.props.currentCategory) return;
    this.props.setCurrentCategory(newCategory);
    this.props.setEmptyImages();
    this.props.fetchImages(newCategory);
  };

  navigateToImageList = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ImageList',
      },
    });
  };

  shareMessage = () => {
    Share.open({
      message: this.props.message,
      url: this.props.imageBlob,
    }).then(result => {
      console.log('result shared');
    });
  };
  render() {
    if (this.props.isLoading) {
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
                  options={this.props.categories}
                  defaultValue={this.props.currentCategory}
                  setCurrentCategory={this.setCurrentCategory}
                />
              </View>
              <TouchableOpacity onPress={this.navigateToImageList}>
                <Image
                  source={{uri: this.props.imageBlob}}
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
              </TouchableOpacity>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: Platform.OS === 'android' ? 40 : 80,
                }}>
                <Message
                  message={this.props.message}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
