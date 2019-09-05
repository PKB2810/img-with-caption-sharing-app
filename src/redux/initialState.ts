/* eslint-disable import/prefer-default-export */
import {
  GOOD_MORNING,
  BIRTHDAY,
  POSITIVE_QUOTES,
} from '../constants/image_categories';

export interface InitialState{
  id:number | null,
  name:string,
  subject: string,
  message: string,
  uri: string,
  imageBlob: string,
  images: any[],
  isLoading:boolean,
  currentCategory:string,
  categories:string[]

}
export const initialState:InitialState = {
  id: null,
  name: '',
  subject: '',
  message: '',
  uri: '',
  imageBlob: '',
  images: [],
  isLoading: true,
  currentCategory: GOOD_MORNING,
  categories: [GOOD_MORNING, BIRTHDAY, POSITIVE_QUOTES],
};
