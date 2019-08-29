import {searchImages} from '../Api/searchImages';
import {getBlobForImage} from '../Api/getBlobForImage';
import {getImages, gettingImages} from '../redux/actionCreators';

export const fetchImages = (newCategory, page = 1) => {
  return async dispatch => {
    dispatch(gettingImages());
    const data = await searchImages(newCategory, page);
    const uri = data[Math.floor(Math.random() * data.length)].urls.small;
    const imageBlob = await getBlobForImage(uri);

    dispatch(
      getImages({
        images: data,
        uri: uri,
        imageBlob: 'data:image/jpeg;base64,' + imageBlob,
        isLoading: false,
      }),
    );
  };
};
