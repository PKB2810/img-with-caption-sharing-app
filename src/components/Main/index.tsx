/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Dispatch } from 'react';
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
import Share from 'react-native-share';
import { connect, DispatchProp } from 'react-redux';
import {InitialState} from '../../redux/initialState'
import { Navigation } from 'react-native-navigation';
import ShareButton from '../ShareButton';
import Message from '../Message';
import DropdownPicker from '../DropdownPicker';
import {
  setMessage,
  setCurrentCategory,
  emptyImages
} from '../../redux/actionCreators';
import { fetchImages } from '../../redux/fetchImages';


const background = require('../../../public/images/background.jpg');

export interface OwnProps{
  componentId?:any
}
export interface IMainStateToProps{
  uri: string,
  imageBlob: string,
  images: any[],
  isLoading: boolean,
  message:string,
  currentCategory: string,
  categories: string[],
}

export interface DispatchToProps{
  setMessage: (message:string) => void,
  setCurrentCategory: (category:string) => void,
  fetchImages: (category:string) => void,
  emptyImages: () => void,
}
type Props = IMainStateToProps & DispatchToProps & OwnProps
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

const mapStateToProps = (state:InitialState):IMainStateToProps => ({
  uri: state.uri,
  imageBlob: state.imageBlob,
  images: state.images,
  isLoading: state.isLoading,
  message:state.message,
  currentCategory: state.currentCategory,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch:any):DispatchToProps => ({
  setMessage: (message:string) => dispatch(setMessage(message)),
  setCurrentCategory: (category:string) => dispatch(setCurrentCategory(category)),
  fetchImages: (category:string) => dispatch(fetchImages(category)),
  emptyImages: () => dispatch(emptyImages()),
});

class MainPage extends React.Component<Props, {}> {
  constructor(props:Props){
    super(props);
  }
  componentDidMount() {
    this.props.fetchImages(this.props.currentCategory);
  }

  setMessage = (message:string) => {
    this.props.setMessage(message);
  };

  setCurrentCategory = (newCategory:string) => {
    if (newCategory === this.props.currentCategory) return;
    this.props.setCurrentCategory(newCategory);
    this.props.emptyImages();
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
    }).then((_result) => {
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
        style={{ width: '100%', height: '100%' }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0}
        >
          <ScrollView style={parentStyle.container}>
            <View style={parentStyle.inner}>
              <View style={{ marginTop: Platform.OS === 'android' ? 20 : 80 }}>
                <DropdownPicker
                  options={this.props.categories}
                  defaultValue={this.props.currentCategory}
                  setCurrentCategory={this.setCurrentCategory}
                />
              </View>
              <TouchableOpacity onPress={this.navigateToImageList}>
                <Image
                  source={{ uri: this.props.uri }}
                  style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    borderWidth: 1,
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
                }}
              >
                <Message
                  message={this.props.message}
                  setMessage={this.setMessage}
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: Platform.OS === 'android' ? 60 : 80,
                }}
              >
                <ShareButton shareMessage={this.shareMessage} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
export default connect<IMainStateToProps,DispatchToProps,OwnProps,InitialState>(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
