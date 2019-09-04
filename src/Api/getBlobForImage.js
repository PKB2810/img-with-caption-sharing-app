/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import RNFetchBlob from 'rn-fetch-blob';

export const getBlobForImage = async (imageUri) => {
  try {
    const response = await RNFetchBlob.fetch('GET', imageUri);
    const base64image = response.data;
    return base64image;
  } catch (err) {
    console.log(err.message);
  }
};
