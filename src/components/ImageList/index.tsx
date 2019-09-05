/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Dispatch, Action} from 'redux'
import { connect } from 'react-redux';
import {InitialState} from '../../redux/initialState'
import SelectableImage from '../SelectableImage';
import { fetchImages } from '../../redux/fetchImages';
import { setSelectedImage,ActionCreators } from '../../redux/actionCreators';

const background = require('../../../public/images/background.jpg');

export interface State{
  page:number
}
export interface StateToProps{
  images:any[],
  imageBlob:string,
  currentCategory:string,
  isLoading:boolean,
  uri:string,
}
export interface DispatchToProps{
  fetchImages:(currentCategory:string,page:number) => void,
  setSelectedImage: (image:any) => void,
}

type Props = DispatchToProps & StateToProps

function mapStateToProps (state:InitialState):StateToProps  {
 return({
  images: state.images,
  imageBlob: state.imageBlob,
  currentCategory: state.currentCategory,
  isLoading: state.isLoading,
  uri: state.uri,
 }) 
};
const mapDispatchToProps = (dispatch:any):DispatchToProps => ({ //doubt on dispatch type
  fetchImages: (category:string, page:number) => dispatch(fetchImages(category, page)),
  setSelectedImage: (image:any) => {
    dispatch(setSelectedImage(image));
  },
});
class ImageList extends React.Component<Props,State> {
  state:State;
  constructor(props:Props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  lazyLoadImages = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.props.fetchImages(this.props.currentCategory, this.state.page);
    });
  };

  renderItem = ({ item }:any) => (
    <View
      style={{
        marginTop: 25,
        width: '50%',
      }}
    >
      <SelectableImage
        isSelected={item.urls.small === this.props.uri}
        setSelectedImage={this.props.setSelectedImage}
        image={item}
      />
    </View>
  );

  render() {
    return (
      <ImageBackground
        source={background}
        style={{ width: '100%', height: '100%' }}
      >
        <FlatList
          columnWrapperStyle={{
            marginLeft: 20,
            marginRight: 20,
          }}
          data={this.props.images}
          numColumns={2}
          horizontal={false}
          keyExtractor={(item:any) => item.id}
          renderItem={this.renderItem}
          onEndReached={this.lazyLoadImages}
          onEndReachedThreshold={0.5}
        />
        {this.props.isLoading && (
          <View style={{ height: '10%', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ImageBackground>
    );
  }
}

export default connect<StateToProps,DispatchToProps,Props,InitialState>(
  mapStateToProps,
  mapDispatchToProps,
)(ImageList);
