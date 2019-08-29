import {
  GET_IMAGES,
  GETTING_IMAGES,
  SET_MESSAGE,
  SET_CURRENT_IMG_BLOB,
  SET_CURRENT_CATEGORY,
  EMPTY_IMAGES,
} from './actionTypes';

export const setMessage = message => {
  return {type: SET_MESSAGE, payload: message};
};
export const gettingImages = () => {
  return {type: GETTING_IMAGES};
};
export const getImages = data => {
  return {type: GET_IMAGES, payload: data};
};

export const setCurrentCategory = category => {
  return {type: SET_CURRENT_CATEGORY, payload: category};
};

export const setCurrentImgBlob = imageBlob => {
  return {type: SET_CURRENT_IMG_BLOB, payload: imageBlob};
};

export const emptyImages = () => {
  return {type: EMPTY_IMAGES};
};
