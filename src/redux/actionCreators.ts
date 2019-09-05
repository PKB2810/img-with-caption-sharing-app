/* eslint-disable max-len */
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

export interface Action{
  type:string,
  payload?:any
}
export interface ActionCreators{
  <T>(value?:T) :  Action
}
export const setMessage = (message:string):Action => ({ type: SET_MESSAGE, payload: message });
export const gettingImages:ActionCreators = () => ({ type: GETTING_IMAGES });
export const getImages:ActionCreators = (data:any) => ({ type: GET_IMAGES, payload: data });
export const getLazyloadedImages:ActionCreators = (data:any) => ({ type: GET_LAZYLOADED_IMAGES, payload: data });

export const setCurrentCategory = (category:string):Action => ({ type: SET_CURRENT_CATEGORY, payload: category });

export const setCurrentImgBlob = (imageBlob:string):Action => ({ type: SET_CURRENT_IMG_BLOB, payload: imageBlob });

export const emptyImages:ActionCreators = ():Action => ({ type: EMPTY_IMAGES });

export const setSelectedImage= (image:any):Action => ({ type: SET_SELECTED_IMAGE, payload: image });
