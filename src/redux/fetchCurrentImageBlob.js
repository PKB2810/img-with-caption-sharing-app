/* eslint-disable import/prefer-default-export */
import { getBlobForImage } from '../Api/getBlobForImage';
import { setCurrentImgBlob } from './actionCreators';

export const fetchCurrentImageBlob = (uri) => async (dispatch) => {
  const imageBlob = await getBlobForImage(uri);
  dispatch(setCurrentImgBlob(`data:image/jpeg;base64,${imageBlob}`));
};
