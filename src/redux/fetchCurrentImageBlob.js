import {getBlobForImage} from '../Api/getBlobForImage';
import {setCurrentImgBlob} from '../redux/actionCreators';

export const fetchCurrentImageBlob = uri => {
  return async dispatch => {
    const imageBlob = await getBlobForImage(uri);
    dispatch(setCurrentImgBlob('data:image/jpeg;base64,' + imageBlob));
  };
};
