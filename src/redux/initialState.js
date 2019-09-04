/* eslint-disable import/prefer-default-export */
import {
  GOOD_MORNING,
  BIRTHDAY,
  POSITIVE_QUOTES,
} from '../constants/image_categories';

export const initialState = {
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
