import React from 'react';
import {View, FlatList, TouchableOpacity, Image} from 'react-native';
import SelectableImage from '../SelectableImage';
import {connect} from 'react-redux';
import {fetchCurrentImageBlob} from '../../redux/fetchCurrentImageBlob';
import {fetchImages} from '../../redux/fetchImages';

mapStateToProps = state => {
  return {
    images: state.images,
    imageBlob: state.imageBlob,
    currentCategory: state.currentCategory,
  };
};
mapDispatchToProps = dispatch => {
  return {
    fetchImages: (category, page) => dispatch(fetchImages(category, page)),
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
        <TouchableOpacity>
          <SelectableImage image={item} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={{
          marginLeft: 20,
          marginRight: 20,
          flexDirection: 'column',
        }}
        data={this.props.images}
        numColumns={3}
        horizontal={false}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        onEndReached={this.lazyLoadImages}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageList);
