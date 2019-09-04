/* eslint-disable import/prefer-default-export */
import { searchImages } from '../Api/searchImages';
import { getBlobForImage } from '../Api/getBlobForImage';
import {
  getImages,
  gettingImages,
  getLazyloadedImages,
} from './actionCreators';

export const fetchImages = (newCategory, page = 1) => async (dispatch) => {
  dispatch(gettingImages());
  const data = await searchImages(newCategory, page);
  const randomImage = data[0];
  const uri = randomImage.urls.small;
  const imageBlob = await getBlobForImage(uri);
  if (page === 1) {
    dispatch(
      getImages({
        images: data,
        uri,
        imageBlob: `data:image/jpeg;base64,${imageBlob}`,
        isLoading: false,
      }),
    );
  } else {
    dispatch(
      getLazyloadedImages({
        images: data,
        isLoading: false,
      }),
    );
  }
};
