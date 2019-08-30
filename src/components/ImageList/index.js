import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import SelectableImage from '../SelectableImage';
import {connect} from 'react-redux';
import {fetchImages} from '../../redux/fetchImages';
import {setSelectedImage} from '../../redux/actionCreators';
import {Navigation} from 'react-native-navigation';

const background = require('../../../public/images/background.jpg');
mapStateToProps = state => {
  return {
    images: state.images,
    imageBlob: state.imageBlob,
    currentCategory: state.currentCategory,
    isLoading: state.isLoading,
    uri: state.uri,
  };
};
mapDispatchToProps = dispatch => {
  return {
    fetchImages: (category, page) => dispatch(fetchImages(category, page)),
    setSelectedImage: image => {
      dispatch(setSelectedImage(image));
    },
  };
};
class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  lazyLoadImages = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.props.fetchImages(this.props.currentCategory, this.state.page);
    });
  };
  renderItem = ({item}) => {
    return (
      <View
        style={{
          marginTop: 25,
          width: '50%',
        }}>
        <SelectableImage
          isSelected={item.urls.small === this.props.uri}
          setSelectedImage={this.props.setSelectedImage}
          image={item}
        />
      </View>
    );
  };

  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <FlatList
          contentContainerStyle={{
            marginLeft: 20,
            marginRight: 20,
            flexDirection: 'column',
            marginBottom: 20,
          }}
          data={this.props.images}
          numColumns={3}
          horizontal={false}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          onEndReached={this.lazyLoadImages}
          onEndReachedThreshold={0.5}
        />
        {this.props.isLoading && (
          <View style={{height: '10%', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ImageBackground>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageList);
