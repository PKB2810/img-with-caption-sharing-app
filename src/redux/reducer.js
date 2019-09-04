/* eslint-disable import/prefer-default-export */
import { initialState } from './initialState';
import {
  GET_IMAGES,
  GETTING_IMAGES,
  SET_CURRENT_CATEGORY,
  SET_MESSAGE,
  SET_CURRENT_IMG_BLOB,
  EMPTY_IMAGES,
  SET_SELECTED_IMAGE,
  GET_LAZYLOADED_IMAGES,
} from './actionTypes';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case GETTING_IMAGES:
      return {
        ...state,
        isLoading: true,
      };
    case GET_IMAGES:
      return {
        ...state,
        images: state.images.concat(action.payload.images),
        isLoading: action.payload.isLoading,
        uri: action.payload.uri,
        imageBlob: action.payload.imageBlob,
      };
    case GET_LAZYLOADED_IMAGES:
      return {
        ...state,
        images: state.images.concat(action.payload.images),
        isLoading: action.payload.isLoading,
      };
    case EMPTY_IMAGES:
      return {
        ...state,
        images: [],
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_CURRENT_IMG_BLOB:
      return {
        ...state,
        imageBlob: action.payload,
      };

    case SET_SELECTED_IMAGE:
      return {
        ...state,
        uri: action.payload.urls.small,
      };

    default:
      return state;
  }
};
