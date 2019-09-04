/* eslint-disable no-shadow */
import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import SelectableImage from '../SelectableImage';

import { fetchImages } from '../../redux/fetchImages';
import { setSelectedImage } from '../../redux/actionCreators';

const background = require('../../../public/images/background.jpg');

const mapStateToProps = (state) => ({
  images: state.images,
  imageBlob: state.imageBlob,
  currentCategory: state.currentCategory,
  isLoading: state.isLoading,
  uri: state.uri,
});
const mapDispatchToProps = (dispatch) => ({
  fetchImages: (category, page) => dispatch(fetchImages(category, page)),
  setSelectedImage: (image) => {
    dispatch(setSelectedImage(image));
  },
});
class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  lazyLoadImages = () => {
    const { page } = this.state;
    // eslint-disable-next-line react/prop-types
    const { currentCategory, fetchImages } = this.props;
    this.setState({ page: page + 1 }, () => {
      fetchImages(currentCategory, page);
    });
  };

  renderItem = ({ item }) => {
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/prop-types
    const { uri, setSelectedImage } = this.props;
    return (
      <View style={{ marginTop: 25, width: '50%' }}>
        <SelectableImage
          isSelected={item.urls.small === uri}
          setSelectedImage={setSelectedImage}
          image={item}
        />
      </View>
    );
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { images, isLoading } = this.props;
    return (
      <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
        <FlatList
          columnWrapperStyle={{
            marginLeft: 20,
            marginRight: 20,
          }}
          data={images}
          numColumns={2}
          horizontal={false}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          onEndReached={this.lazyLoadImages}
          onEndReachedThreshold={0.5}
        />
        { isLoading && (
          <View style={{ height: '10%', justifyContent: 'center' }}>
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
