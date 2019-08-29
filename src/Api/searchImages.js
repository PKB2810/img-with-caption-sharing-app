import {BASE_URL} from '../constants/url';
import {CLIENT_ID} from '../constants/clientId';
const SEARCH_PHOTOS = '/search/photos/';

export const searchImages = async (searchParameter, page = 1) => {
  try {
    const uri =
      BASE_URL +
      SEARCH_PHOTOS +
      '?' +
      'client_id=' +
      CLIENT_ID +
      '&query=' +
      searchParameter +
      '&page=' +
      page;
    const response = await fetch(uri);
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log(err.message);
  }
};
