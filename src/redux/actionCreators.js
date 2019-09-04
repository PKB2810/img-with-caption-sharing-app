import {
  GET_IMAGES,
  GETTING_IMAGES,
  SET_MESSAGE,
  SET_CURRENT_IMG_BLOB,
  SET_CURRENT_CATEGORY,
  EMPTY_IMAGES,
  SET_SELECTED_IMAGE,
  GET_LAZYLOADED_IMAGES,
} from './actionTypes';

export const setMessage = (message) => ({ type: SET_MESSAGE, payload: message });
export const gettingImages = () => ({ type: GETTING_IMAGES });
export const getImages = (data) => ({ type: GET_IMAGES, payload: data });
export const getLazyloadedImages = (data) => ({ type: GET_LAZYLOADED_IMAGES, payload: data });

export const setCurrentCategory = (category) => ({ type: SET_CURRENT_CATEGORY, payload: category });

// eslint-disable-next-line max-len
export const setCurrentImgBlob = (imageBlob) => ({ type: SET_CURRENT_IMG_BLOB, payload: imageBlob });

export const emptyImages = () => ({ type: EMPTY_IMAGES });

export const setSelectedImage = (image) => ({ type: SET_SELECTED_IMAGE, payload: image });
