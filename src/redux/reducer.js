import {initialState} from '../redux/initialState';
import {
  GET_IMAGES,
  GETTING_IMAGES,
  SET_CURRENT_CATEGORY,
  SET_MESSAGE,
  SET_CURRENT_IMG_BLOB,
  EMPTY_IMAGES,
} from '../redux/actionTypes';

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

    default:
      return state;
  }
};
