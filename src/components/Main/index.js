/* eslint-disable no-shadow */
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
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import Share from 'react-native-share';
import { Navigation } from 'react-native-navigation';
import ShareButton from '../ShareButton';
import Message from '../Message';
import DropdownPicker from '../DropdownPicker';
import {
  setMessage,
  setCurrentCategory,
  emptyImages,
} from '../../redux/actionCreators';
import { fetchImages } from '../../redux/fetchImages';

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

const mapStateToProps = (state) => ({
  uri: state.uri,
  imageBlob: state.imageBlob,
  images: state.images,
  isLoading: state.isLoading,
  currentCategory: state.currentCategory,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  setMessage: (message) => dispatch(setMessage(message)),
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
  fetchImages: (category) => dispatch(fetchImages(category)),
  emptyImages: () => dispatch(emptyImages()),
});
class MainPage extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { fetchImages, currentCategory } = this.props;
    fetchImages(currentCategory);
  }

  setMessage = (message) => {
    // eslint-disable-next-line react/prop-types
    const { setMessage } = this.props;
    setMessage(message);
  };

  setCurrentCategory = (newCategory) => {
    const {
      // eslint-disable-next-line react/prop-types
      currentCategory, setCurrentCategory, emptyImages, fetchImages,
    } = this.props;
    if (newCategory === currentCategory) return;
    setCurrentCategory(newCategory);
    emptyImages();
    fetchImages(newCategory);
  };

  navigateToImageList = () => {
    // eslint-disable-next-line react/prop-types
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'ImageList',
      },
    });
  };

  shareMessage = () => {
    // eslint-disable-next-line react/prop-types
    const { message, imageBlob } = this.props;
    Share.open({
      message,
      url: imageBlob,
    });
  };

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      isLoading, categories, currentCategory, uri, message,
    } = this.props;
    if (isLoading) {
      return (
        <View style={parentStyle.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ImageBackground
        source={background}
        style={{ width: '100%', height: '100%' }}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0}>
          <ScrollView style={parentStyle.container}>
            <View style={parentStyle.inner}>
              <View style={{ marginTop: Platform.OS === 'android' ? 20 : 80 }}>
                <DropdownPicker
                  options={categories}
                  defaultValue={currentCategory}
                  setCurrentCategory={this.setCurrentCategory}
                />
              </View>
              <TouchableOpacity onPress={this.navigateToImageList}>
                <Image
                  source={{ uri }}
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

              <View style={{
                display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: Platform.OS === 'android' ? 40 : 80,
              }}
              >
                <Message
                  message={message}
                  setMessage={this.setMessage}
                />
              </View>
              <View style={{ alignSelf: 'center', marginTop: Platform.OS === 'android' ? 60 : 80 }}>
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
