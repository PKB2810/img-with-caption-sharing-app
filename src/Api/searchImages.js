/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { BASE_URL } from '../constants/url';
import { CLIENT_ID } from '../constants/clientId';

const SEARCH_PHOTOS = '/search/photos/';

// eslint-disable-next-line import/prefer-default-export
export const searchImages = async (searchParameter, page = 1) => {
  try {
    const uri = `${BASE_URL
      + SEARCH_PHOTOS
    }?`
      + `client_id=${
        CLIENT_ID
      }&query=${
        searchParameter
      }&page=${
        page}`;
    const response = await fetch(uri);
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log(err.message);
  }
};
